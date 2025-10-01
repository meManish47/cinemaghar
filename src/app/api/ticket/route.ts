import { NextResponse } from "next/server";
import Stripe from "stripe";
import { gqlClient } from "@/services/gql";
import {
  GET_SHOW_BY_ID,
  GET_SEAT_BY_ID,
  GET_USER_BY_CLERK_ID,
} from "@/app/queries";
import { SHOW_WITH_HALL_MOVIE } from "@/app/movie/seatselection/[id]/page";

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

    if (!session.metadata?.showId) {
      return NextResponse.json(
        { error: "No metadata on session" },
        { status: 404 }
      );
    }
    // console.log("SESSION IN TICKET", session);
    const showId = session.metadata.showId;
    const seatIds = session.metadata.seatIds?.split(",") || [];
    const userClerkId = session.metadata.userId;

    const user = await gqlClient.request(GET_USER_BY_CLERK_ID, {
      clerkId: userClerkId,
    });

    // Fetch show/movie details from DB
    const showRes: { getShowById: SHOW_WITH_HALL_MOVIE } =
      await gqlClient.request(GET_SHOW_BY_ID, {
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
      hallName: showRes.getShowById.hall.hall_name,
      cinemaName: cinema.name,
      showDate: new Date(Number(showRes.getShowById.start)),
      showTime: new Date(
        Number(showRes.getShowById.start)
      ).toLocaleTimeString(),
      seats: seatsData,
      screen: showRes.getShowById.hall.hall_name,
      user
    });
  } catch (err: any) {
    console.error("ticket fetch error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
