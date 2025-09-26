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
