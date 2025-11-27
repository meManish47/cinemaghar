import { revalidateTag } from "next/cache";
import { DELETE_SHOW, REVALIDATE_TAG } from "../app/queries";
import { gqlClient } from "./gql";
import prismaClient from "./prisma";

export async function softDeleteShows() {
  try {
    // const res = await gqlClient.request(GET_SHOWS_BY_MOVIE, { movieId });
    // // const allShows = res.getShowsByMovie || [];
    const now = new Date();
    const allShows = await prismaClient.show.findMany();

    for (const show of allShows) {
      const deleteTime = now >= new Date(Number(show.start) - 21600000);

      if (deleteTime) {
        await gqlClient.request(DELETE_SHOW, { showId: show.id });
      }
    }
    // revalidateTag("moviesChanged");
    await gqlClient.request(REVALIDATE_TAG);
  } catch (err) {
    console.error("Error:", err);
  }
}
