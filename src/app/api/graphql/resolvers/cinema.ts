import prismaClient from "@/services/prisma";

export async function getAllCinemas() {
  try {
    const cinemas = await prismaClient.cinema.findMany({
      include: { halls: true },
    });
    if (!cinemas) return null;
    return cinemas;
  } catch (error) {
    return null;
  }
}

export async function addCinema(
  parent: unknown,
  args: { name: string; location: string }
) {
  try {
    const cinema = await prismaClient.cinema.create({
      data: {
        name: args.name,
        location: args.location,
      },
    });
    return cinema;
  } catch (error) {
    return null;
  }
}
