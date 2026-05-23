import { CREATE_BOOKING, GET_SEAT_BY_ID, GET_SHOW_BY_ID } from "@/app/queries";
import { HallsWithCinema, SHOW_WITH_HALL_MOVIE } from "@/app/types";
import { gqlClient } from "@/services/gql";
import prismaClient from "@/services/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Booking, Seat } from "../../../../generated/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: Request) {
  try {
    const { showId, seats, coupon, currentUserId } = await req.json();

    if (!showId || !Array.isArray(seats) || seats.length === 0) {
      return NextResponse.json(
        { ok: false, error: "showId and seats are required" },
        { status: 400 }
      );
    }

    if (!currentUserId) {
      return NextResponse.json(
        { ok: false, error: "User not found. Please sign in again." },
        { status: 401 }
      );
    }

    const data: { getShowById: SHOW_WITH_HALL_MOVIE } = await gqlClient.request(
      GET_SHOW_BY_ID,
      { showId }
    );
    const seatsData = await Promise.all(
      seats.map(async (seatId) => {
        const seatRes: { getSeatById: Seat & { hall: HallsWithCinema } } =
          await gqlClient.request(GET_SEAT_BY_ID, { seatId });
        return ` ${seatRes.getSeatById.seat_no}`;
      })
    );

    const currentUser = await prismaClient.user.findUnique({
      where: { clerkId: currentUserId },
    });

    if (!currentUser) {
      return NextResponse.json(
        { ok: false, error: "User not found. Please sign in again." },
        { status: 401 }
      );
    }

    const bookingResponse = await gqlClient.request<{
      createBooking: Booking | null;
    }>(CREATE_BOOKING, {
      showId,
      seats,
      userId: currentUser.id,
      status: "PENDING",
    });

    if (!bookingResponse?.createBooking) {
      return NextResponse.json(
        {
          ok: false,
          error: "Failed to create booking. Please select different seats and try again.",
        },
        { status: 409 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Movie Ticket (Show: ${data.getShowById.movie.movie_title})`,
              description: `Seats: ${seatsData.join(", ")}`,
            },
            unit_amount: 200 * 100,
          },
          quantity: seats.length,
        },
      ],
      mode: "payment",
      allow_promotion_codes: !coupon,
      discounts: coupon ? [{ coupon }] : [],
      metadata: {
        showId,
        seatIds: seats.join(","),
        userId: currentUserId,
        bookingId: bookingResponse.createBooking.id,
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?showId=${encodeURIComponent(showId)}`,
    });

    return NextResponse.json({ ok: true, id: session.id, url: session.url });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message || "checkout_failed" },
      { status: 500 }
    );
  }
}
