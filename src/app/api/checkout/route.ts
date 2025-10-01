// src/app/api/checkout/route.ts
import { SHOW_WITH_HALL_MOVIE } from "@/app/movie/seatselection/[id]/page";
import { GET_SEAT_BY_ID, GET_SHOW_BY_ID } from "@/app/queries";
import { gqlClient } from "@/services/gql";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Hall, Seat } from "../../../../generated/prisma";
import { HallsWithCinema } from "@/app/admin/halls/page";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: Request) {
  try {
    const { showId, seats, coupon ,userId} = await req.json();

    if (!showId || !Array.isArray(seats) || seats.length === 0) {
      return NextResponse.json(
        { ok: false, error: "showId and seats are required" },
        { status: 400 }
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

        const rowLetter = String.fromCharCode(64 + seatRes.getSeatById.row_no);

        return `${rowLetter} ${seatRes.getSeatById.seat_no}`;
      })
    );

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
      allow_promotion_codes: true,
      discounts: coupon ? [{ coupon }] : [],
      metadata: {
        showId,
        seatIds: seats.join(","),
        userId: userId || "guest",
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/checkout?showId=${encodeURIComponent(showId)}`,
    });

    return NextResponse.json({ ok: true, id: session.id, url: session.url });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "checkout_failed" },
      { status: 500 }
    );
  }
}
