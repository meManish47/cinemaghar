import {
  CONFIRM_BOOKING,
  GENERATE_TICKETS,
  GET_SEAT_BY_ID,
  GET_SHOW_BY_ID,
  GET_USER_BY_CLERK_ID,
} from "@/app/queries";
import { gqlClient } from "@/services/gql";
import Stripe from "stripe";
import { Booking, Seat, User } from "../../../../../generated/prisma";
import prismaClient from "@/services/prisma";
import { SHOW_WITH_HALL_MOVIE } from "@/app/movie/seatselection/[id]/page";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});
export async function getTicketDataFromSession(
  parent: unknown,
  { sessionId }: { sessionId: string }
) {
  try {
    if (!sessionId) return { error: "session_id required", status: 400 };
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session.metadata?.showId) {
      return { error: "No metadata on session", status: 404 };
    }
    const showId = session.metadata.showId;
    const seatIds = session.metadata.seatIds?.split(",") || [];
    const userId = session.metadata.userId;
    const bookingId = session.metadata.bookingId;

    const userRes: { getUserByClerkId: User } = await gqlClient.request(
      GET_USER_BY_CLERK_ID,
      {
        clerkId: userId,
      }
    );

    const user = userRes.getUserByClerkId;
    const showRes: { getShowById: SHOW_WITH_HALL_MOVIE } =
      await gqlClient.request(GET_SHOW_BY_ID, {
        showId,
      });
    const movie = showRes.getShowById.movie;
    const cinema = showRes.getShowById.hall.cinema;
    // Fetch seat info
    const seatsData = await Promise.all(
      seatIds.map(async (seatId: string) => {
        const seatRes: { getSeatById: Seat } = await gqlClient.request(
          GET_SEAT_BY_ID,
          {
            seatId,
          }
        );
        return ` ${seatRes.getSeatById.seat_no}`;
      })
    );
    const seatsInputs = await Promise.all(
      seatIds.map(async (seatId: string) => {
        const seatRes: { getSeatById: Seat } = await gqlClient.request(
          GET_SEAT_BY_ID,
          {
            seatId,
          }
        );
        return {
          id: seatRes.getSeatById.id,
          row_no: seatRes.getSeatById.row_no,
          seat_no: seatRes.getSeatById.seat_no,
        };
      })
    );
    const startMs = Number(showRes.getShowById.start);
    const startDate = new Date(startMs).toISOString();
    const startTime = new Date(
      Number(showRes.getShowById.start)
    ).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    await gqlClient.request(CONFIRM_BOOKING, {
      bookingId,
    });
    

    const returnObj = {
      movieTitle: movie.movie_title,
      moviePoster: movie.cover,
      hallName: showRes.getShowById.hall.hall_name,
      cinemaName: cinema.name,
      showDate: startDate,
      showTime: startTime,
      seats: seatsData,
      screen: showRes.getShowById.hall.hall_name,
      user: user,
     };
    // console.log("SUCCESPAGE TICKET ", returnObj);
    return returnObj;
  } catch (error) {
    return { error: (error as Error).message, status: 500 };
  }
}
