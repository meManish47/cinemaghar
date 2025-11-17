import prismaClient from "@/services/prisma";

export async function getShowsByMovie(
  parent: unknown,
  args: { movieId: string }
) {
  try {
    const shows = await prismaClient.show.findMany({
      where: { movieId: args.movieId },
      include: { hall: { include: { cinema: true } }, movie: true },
    });
    if (shows) return shows;
    return null;
  } catch (error) {
    return null;
  }
}
export async function getShowsByCinema(
  parent: unknown,
  args: { cinemaId: string }
) {
  try {
    const shows = await prismaClient.show.findMany({
      where: { hall: { cinemaId: args.cinemaId } },
      include: { hall: { include: { cinema: true } }, movie: true },
    });
    if (shows) return shows;
    return null;
  } catch (error) {
    return null;
  }
}

export async function addShow(
  parent: unknown,
  args: {
    movieId: string;
    hallId: string;
    start: string;
    finish: string;
    date: string;
  }
) {
  try {
    const startDateTime = new Date(`${args.date}T${args.start}:00.000Z`);
    const finishDateTime = new Date(`${args.date}T${args.finish}:00.000Z`);

    const show = await prismaClient.show.create({
      data: {
        movieId: args.movieId,
        hallId: args.hallId,
        start: startDateTime,
        finish: finishDateTime,
        date: new Date(args.date),
      },
      include: { hall: { include: { cinema: true } }, movie: true },
    });
    // console.log("---------")
    // console.log(startDateTime,finishDateTime,args.date)
    return show;
    return null;
  } catch (error) {
    console.error("Error adding show:", error);
    return null;
  }
}
export async function getShowById(
  parent: unknown,
  { showId }: { showId: string }
) {
  try {
    const show = await prismaClient.show.findUnique({
      where: { id: showId },
      include: {
        hall: { include: { seats: true, cinema: true } },
        movie: true,
        bookings: { include: { seats: true } },
      },
    });
    if (show) return show;
    return null;
  } catch (error) {
    return null;
  }
}

export async function deleteShow(parent: unknown, args: { showId: string }) {
  try {
    // console.log("entered deleted");
    const show = await prismaClient.show.findUnique({
      where: { id: args.showId },
      include: { bookings: true },
    });
    console.log("show found");
    if (!show) return false;
    // await prismaClient.booking.deleteMany({ where: { showId: args.showId } });
    await prismaClient.show.delete({
      where: { id: args.showId },
    });
    console.log("deleted");
    return true;
  } catch (error) {
    return false;
  }
}

export async function getAllShows() {
  try {
    const shows = await prismaClient.show.findMany({
      include: { hall: true, movie: true },
    });
    return shows;
  } catch (error) {
    return null;
  }
}
