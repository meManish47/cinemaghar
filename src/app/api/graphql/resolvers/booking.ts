import prismaClient from "@/services/prisma";

export async function createBooking(
  parent: unknown,
  {
    status,
    userId,
    showId,
    seats,
  }: { status: string; userId: string; showId: string; seats: string[] }
) {
  try {
    const booking = await prismaClient.booking.create({
      data: {
        showId,
        userId,
        status: "PENDING",
        seats: {
          connect: seats.map((seatId) => ({ id: seatId })),
        },
      },
    });
    return booking;
  } catch (error) {
    return null;
  }
}
export async function confirmBooking(
  parent: unknown,
  { bookingId }: { bookingId: string }
) {
  try {
    const booking = await prismaClient.booking.update({
      where: { id: bookingId },
      data: { status: "CONFIRMED" },
      include: { user: true, show: { include: { hall: true, movie: true } } },
    });
    return booking;
  } catch (error) {
    return null;
  }
}
