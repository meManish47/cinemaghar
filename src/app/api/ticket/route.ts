import { NextResponse } from "next/server";
import Stripe from "stripe";
import { gqlClient } from "@/services/gql";
import { GET_SHOW_BY_ID, GET_SEAT_BY_ID } from "@/app/queries";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "session_id required" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    // console.log("SESION", session   );
    if (!session.metadata?.showId) {
      return NextResponse.json(
        { error: "No metadata on session" },
        { status: 404 }
      );
    }

    const showId = session.metadata.showId;
    const seatIds = session.metadata.seatIds?.split(",") || [];

    // Fetch show/movie details from DB (GraphQL example)
    const showRes: any = await gqlClient.request(GET_SHOW_BY_ID, {
      showId,
    });
    const movie = showRes.getShowById.movie;
    const cinema = showRes.getShowById.hall.cinema;

    // Fetch seat info
    const seatsData = await Promise.all(
      seatIds.map(async (seatId: string) => {
        const seatRes: any = await gqlClient.request(GET_SEAT_BY_ID, {
          seatId,
        });
        const rowLetter = String.fromCharCode(64 + seatRes.getSeatById.row_no);
        return `${rowLetter} ${seatRes.getSeatById.seat_no}`;
      })
    );

    return NextResponse.json({
      movieTitle: movie.movie_title,
      moviePoster: movie.cover,
      cinemaName: cinema.name,
      showDate: new Date(Number(showRes.getShowById.start.split("T")[0])),
      showTime: new Date(
        Number(showRes.getShowById.start)
      ).toLocaleTimeString(),
      seats: seatsData,
      screen: showRes.getShowById.hall.name,
    });
  } catch (err: any) {
    console.error("ticket fetch error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
