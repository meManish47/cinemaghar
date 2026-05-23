import prismaClient from "@/services/prisma";
import { revalidateTag } from "next/cache";

export async function getAllMovies() {
  try {
    const movies = await prismaClient.movie.findMany();
    if (movies) return movies;
    return null;
  } catch (error) {
    return null;
  }
}
export async function getMovieWithId(_: unknown, args: { id: string }) {
  try {
    const movie = await prismaClient.movie.findUnique({
      where: { id: args.id },
      include: { shows: { where: { isDeleted: false } } },
    });

    if (!movie) {
      return { success: false, movie: null, message: "Movie not found" };
    }

    return { success: true, movie, message: "Fetched successfully" };
  } catch (error) {
    return { success: false, movie: null, message: "Database error" };
  }
}

// export async function revalidateTagFromGql(){
//   try {
//     revalidateTag("moviesChanged")
//     return true
//   } catch (error) {
//     return false
//   }
// }
