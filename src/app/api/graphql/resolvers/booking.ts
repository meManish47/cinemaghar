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

export async function getBookingsByHall(
  parent: unknown,
  args: { hallId: string }
) {
  try {
    const bookings = await prismaClient.booking.findMany({
      where: { show: { hallId: args.hallId } },
      include: {
        seats: true,
        user: true,
        show: {
          include: {
            movie: true,
          },
        },
      },
    });
    return bookings;
  } catch (error) {
    return null;
  }
}
