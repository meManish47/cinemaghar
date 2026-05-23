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
export async function getCounts() {
  const now = new Date();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const [cinemaCount, hallCount, userCount, todayBookings, upcomingShows] =
    await Promise.all([
      prismaClient.cinema.count(),
      prismaClient.hall.count(),
      prismaClient.user.count(),
      prismaClient.booking.count({
        where: {
          createdAt: { gte: startOfToday },
          status: "CONFIRMED",
        },
      }),
      prismaClient.show.count({
        where: {
          start: { gt: now },
          isDeleted: false,
        },
      }),
    ]);

  return {
    cinemaCount,
    hallCount,
    userCount,
    todayBookings,
    upcomingShows,
  };
}
