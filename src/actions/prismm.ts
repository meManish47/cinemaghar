// "use server";
// import prismaClient from "@/services/prisma";
// import { Movie } from "../../generated/prisma";

// export default async function addmoviesToDB(movies: Movie[]) {
//   try {
//     const movie = await prismaClient.movie.createMany({
//       data: movies,
//     });
//     if (movie) console.log("Successs");
//     else console.log("Error");
//   } catch (error) {
//     console.log(error);
//   }
// }
