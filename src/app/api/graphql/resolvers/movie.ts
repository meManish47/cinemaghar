import prismaClient from "@/services/prisma";

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
      include: { shows: { where: { deletedAt: null } } },
    });

    if (!movie) {
      return { success: false, movie: null, message: "Movie not found" };
    }

    return { success: true, movie, message: "Fetched successfully" };
  } catch (error) {
    return { success: false, movie: null, message: "Database error" };
  }
}
