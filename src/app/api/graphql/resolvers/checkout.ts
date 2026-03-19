import { CREATE_BOOKING, GET_SEAT_BY_ID, GET_SHOW_BY_ID } from "@/app/queries";
import { HallsWithCinema, SHOW_WITH_HALL_MOVIE } from "@/app/types";
import { gqlClient } from "@/services/gql";
import { Booking, Seat } from "../../../../../generated/prisma";
import prismaClient from "@/services/prisma";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export default async function createCheckoutSession(
  _: unknown,
  {
    showId,
    seats,
    coupon,
    currentUserId,
  }: {
    showId: string;
    seats: string[];
    coupon?: string;
    currentUserId?: string;
  },
): Promise<{ ok: boolean; id?: string; url: string | null; error?: string }> {

   try { 
  // 1. Validate inputs
  if (!showId || !Array.isArray(seats) || seats.length === 0) {
    return { ok: false, error: "showId and seats are required", url: null };
  }

  // 2. Fetch show details
  const data: { getShowById: SHOW_WITH_HALL_MOVIE } = await gqlClient.request(
    GET_SHOW_BY_ID,
    { showId },
  );

  // 3. Fetch seat numbers for the description
  const seatsData = await Promise.all(
    seats.map(async (seatId) => {
      const seatRes: { getSeatById: Seat & { hall: HallsWithCinema } } =
        await gqlClient.request(GET_SEAT_BY_ID, { seatId });
      return ` ${seatRes.getSeatById.seat_no}`;
    }),
  );

  // 4. Resolve the internal user from Clerk ID
  const currentUser = await prismaClient.user.findUnique({
    where: { clerkId: currentUserId },
  });

  // 5. Create a PENDING booking
  const booking: { createBooking: Booking } = await gqlClient.request(
    CREATE_BOOKING,
    {
      showId,
      seats,
      userId: currentUser?.id,
      status: "PENDING",
    },
  );

  // 6. Create Stripe checkout session
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
          unit_amount: 200 * 100, // ₹200 per seat
        },
        quantity: seats.length,
      },
    ],
    mode: "payment",
    allow_promotion_codes: true,
    // allow_promotion_codes and discounts are mutually exclusive in Stripe.
    // Use one or the other — here we prefer discounts when a coupon is passed.
    discounts: coupon ? [{ coupon }] : [],
    metadata: {
      showId,
      seatIds: seats.join(","),
      userId: currentUserId || "guest",
      bookingId: booking.createBooking.id || "bookingId",
    },
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?showId=${encodeURIComponent(showId)}`,
  });

  return { ok: true, id: session.id, url: session.url };
}
catch (err) {
    // Log the real error so you can debug it server-side
    console.error("[createCheckoutSession] error:", err);
    return {
      ok: false,
      error: (err as Error).message || "checkout_failed",
      url: null,
    };
  }
}
