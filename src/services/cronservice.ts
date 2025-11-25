import { DELETE_SHOW } from "../app/queries.js";
import { gqlClient } from "./gql.js";
import prismaClient from "./prisma.js";

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
  } catch (err) {
    console.error("Error:", err);
  }
}
