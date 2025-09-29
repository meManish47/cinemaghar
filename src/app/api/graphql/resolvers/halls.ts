import prismaClient from "@/services/prisma";

export async function getAllHalls() {
  try {
    const halls = await prismaClient.hall.findMany({
      include: { cinema: true, shows: true },
    });
    if (halls) return halls;
    return null;
  } catch (error) {
    return null;
  }
}
export async function addHall(
  parent: unknown,
  args: { hall_name: string; cinemaId: string; capacity: number }
) {
  try {
    const hall = await prismaClient.hall.create({
      data: {
        hall_name: args.hall_name,
        cinemaId: args.cinemaId,
        capacity: args.capacity,
      },
    });
    if (hall) return hall;
    return null;
  } catch (error) {
    return null;
  }
}
