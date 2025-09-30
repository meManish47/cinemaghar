import prismaClient from "@/services/prisma";

export const addBulkSeats = async (
  parent: unknown,
  {
    hallId,
    seats,
  }: { hallId: string; seats: { row_no: number; seat_no: number }[] }
) => {
  if (!hallId || !seats || seats.length === 0) {
    throw new Error("hallId and seats are required");
  }

  const seatsToCreate = seats.map((s) => ({
    hallId,
    row_no: s.row_no,
    seat_no: s.seat_no,
  }));

  await prismaClient.seat.createMany({
    data: seatsToCreate,
  });

  return prismaClient.seat.findMany({
    where: { hallId },
    orderBy: { row_no: "asc" },
  });
};

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
