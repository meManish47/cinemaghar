import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: Request) {
  try {
    const { showId, seats, coupon } = await req.json(); // receive coupon code

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Movie Ticket (Show: ${showId})`,
              description: `Seats: ${seats.join(", ")}`,
            },
            unit_amount: 200 * 100, // ₹200 per seat
          },
          quantity: seats.length,
        },
      ],
      mode: "payment",
      allow_promotion_codes: true, // 👈 this alone enables promo code input
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?showId=${showId}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
