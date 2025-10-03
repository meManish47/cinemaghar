import { gqlClient } from "@/services/gql";
import { Ticket, User } from "../../../generated/prisma";
import { GET_TICKET_RESPONSE } from "../queries";
import SuccessPageClient from "@/components/success/successpageClient";

export type TicketResponse = {
  movieTitle: string;
  moviePoster: string;
  hallName: string;
  cinemaName: string;
  showDate: string;
  showTime: string;
  seats: string[];
  screen: string;
  user: User;
  tickets: Ticket[];
};
export default async function Page({ searchParams }: { searchParams: { session_id?: string } }) {
  const sessionId = searchParams.session_id;

  if (!sessionId) return <p>No session id provided</p>;

  const res: { getTicketDataFromSession: TicketResponse } =
    await gqlClient.request(GET_TICKET_RESPONSE, { sessionId });

  const ticketData = res.getTicketDataFromSession;

  return <SuccessPageClient ticketData={ticketData} sessionId={sessionId} />;
}
