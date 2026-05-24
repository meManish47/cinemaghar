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
    const booking = await prismaClient.$transaction(async (tx) => {
      // --------------------------------------------------
      // 1. Reuse existing pending booking for same user
      // --------------------------------------------------

      const existingPendingBooking = await tx.booking.findFirst({
        where: {
          userId,
          showId,
          status: "PENDING",
        },
        include: {
          seats: true,
        },
      });

      if (existingPendingBooking) {
        const existingSeatIds = existingPendingBooking.seats
          .map((seat) => seat.id)
          .sort();

        const requestedSeatIds = [...seats].sort();

        const sameSeats =
          existingSeatIds.length === requestedSeatIds.length &&
          existingSeatIds.every(
            (seatId, index) => seatId === requestedSeatIds[index]
          );

        if (sameSeats) {
          return existingPendingBooking;
        }
      }

      // --------------------------------------------------
      // 2. Normal seat validation
      // --------------------------------------------------

      const requestedSeats = await tx.seat.findMany({
        where: {
          id: {
            in: seats,
          },
        },
        include: {
          booking: {
            select: {
              status: true,
              userId: true,
            },
          },
        },
      });

      const takenSeats = requestedSeats.filter(
        (seat) =>
          seat.bookingId !== null &&
          seat.booking &&
          seat.booking.userId !== userId &&
          (seat.booking.status === "PENDING" ||
            seat.booking.status === "CONFIRMED")
      );

      if (takenSeats.length > 0) {
        const takenSeatNumbers = takenSeats
          .map((s) => s.seat_no)
          .join(",");

        throw new Error(`SEATS_TAKEN:${takenSeatNumbers}`);
      }

      // --------------------------------------------------
      // 3. Create new booking
      // --------------------------------------------------

      return tx.booking.create({
        data: {
          showId,
          userId,
          status: "PENDING",
          seats: {
            connect: seats.map((seatId) => ({
              id: seatId,
            })),
          },
        },
      });
    });

    return booking;
  } catch (error) {
    const errorMessage = (error as Error).message;

    if (errorMessage.startsWith("SEATS_TAKEN:")) {
      console.error(`Booking failed: ${errorMessage}`);
    }

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

export async function releaseBooking(bookingId: string) {
  try {
    await prismaClient.$transaction([
      prismaClient.seat.updateMany({
        where: { bookingId },
        data: { bookingId: null },
      }),
      prismaClient.booking.update({
        where: { id: bookingId },
        data: { status: "CANCELLED" },
      }),
    ]);
  } catch (error) {
    console.error(`Failed to release booking ${bookingId}:`, error);
    throw error;
  }
}
