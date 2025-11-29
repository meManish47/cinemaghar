import { GET_MOVIES_BY_ID, GET_SHOWS_BY_MOVIE } from "@/app/queries";
import { gqlClient } from "@/services/gql";
import ShowShows from "@/components/show/showcard";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Film } from "lucide-react";
import Link from "next/link";
import { GroupedCinema, ShowWithHall } from "@/app/types";
import { Movie } from "../../../../../generated/prisma";

export default async function BuyTicketsPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await currentUser();

  if (user && user.publicMetadata?.role === "ADMIN") {
    redirect("/");
  }

  const id = params.id;

  let shows: ShowWithHall[] = [];
  let movie: Movie | null = null;

  try {
    const res: { getShowsByMovie: ShowWithHall[] } = await gqlClient.request(
      GET_SHOWS_BY_MOVIE,
      { movieId: id }
    );
    shows = res.getShowsByMovie || [];
  } catch (error) {
    console.error("Error fetching shows:", error);
  }

  try {
    const movRes: { getMovieWithId: { movie: Movie } } =
      await gqlClient.request(GET_MOVIES_BY_ID, { getMovieWithIdId: id });
    movie = movRes.getMovieWithId.movie;
  } catch (error) {
    console.error("Error fetching movie:", error);
  }

  if (!shows.length)
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center p-6">
        <Film className="w-20 h-20 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          No Shows Available
        </h2>
        <p className="text-gray-500 max-w-md text-sm mb-4">
          Currently, there are no showtimes scheduled for this movie. Please
          check back later!
        </p>
        <Link
          href="/"
          className="px-6 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700"
        >
          Browse Other Movies
        </Link>
      </div>
    );

  const groupedByCinema: Record<string, GroupedCinema> = shows.reduce(
    (acc: Record<string, GroupedCinema>, show: ShowWithHall) => {
      const cinemaId = show.hall.cinema.id;
      if (!acc[cinemaId]) {
        acc[cinemaId] = {
          cinema: show.hall.cinema,
          shows: [],
        };
      }
      acc[cinemaId].shows.push(show);
      return acc;
    },
    {}
  );

  return (
    <div className="w-full px-34 mx-auto p-6 min-h-screen">
      <div className="flex flex-col gap-4 mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          Shows for {movie?.movie_title}
        </h1>
        <div className="w-max rounded-2xl border text-sm px-2 text-muted-foreground border-gray-500">
          <p>Movie Runtime : 2h 25m</p>
        </div>
      </div>

      <ShowShows grouped={Object.values(groupedByCinema)} />
    </div>
  );
}
