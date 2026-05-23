import prismaClient from "@/services/prisma";


export async function getSeatById(
  parent: unknown,
  { seatId }: { seatId: string }
) {
  try {
    const seat = await prismaClient.seat.findUnique({
      where: { id: seatId },
      include: { hall: { include: { cinema: true } } },
    });
    return seat;
  } catch (error) {
    return null;
  }
}
