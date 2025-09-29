"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { gqlClient } from "@/services/gql";
import Link from "next/link";
import { gql } from "graphql-request";
import { Hall, Movie, Show } from "../../../../../generated/prisma";
import { GET_MOVIES_BY_ID, GET_SHOWS_BY_MOVIE } from "@/app/queries";

export type ShowWithHall = Show & {
  hall: Hall;
};
export default function BuyTicketsPage() {
  const { id } = useParams();
  const [shows, setShows] = useState<ShowWithHall[]>([]);
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<Movie>();
  useEffect(() => {
    async function fetchShows() {
      try {
        const res: { getShowsByMovie: ShowWithHall[] } =
          await gqlClient.request(GET_SHOWS_BY_MOVIE, { movieId: id });
        setShows(res.getShowsByMovie || []);
      } catch (err) {
        console.error("Error fetching shows:", err);
      } finally {
        setLoading(false);
      }
    }
    async function fetchMovie() {
      try {
        const movRes: {
          getMovieWithId: {
            success: boolean;
            message: string;
            movie: Movie;
          };
        } = await gqlClient.request(GET_MOVIES_BY_ID, { getMovieWithIdId: id });

        setMovie(movRes.getMovieWithId.movie);
      } catch (error) {
        console.error("Error fetching shows:", error);
      }
    }
    if (id) {
      fetchShows();
      fetchMovie();
    }
  }, [id]);

  if (loading)
    return (
      <p className="p-6 h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-xl"></span>
      </p>
    );
  if (!shows.length)
    return <p className="p-6 h-screen">No shows available for this movie.</p>;

  const groupedByCinema = shows.reduce((acc: any, show: any) => {
    const cinemaId = show.hall.cinema.id;
    if (!acc[cinemaId]) {
      acc[cinemaId] = {
        cinema: show.hall.cinema,
        shows: [],
      };
    }
    acc[cinemaId].shows.push(show);
    return acc;
  }, {});
  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Available Shows of {movie?.movie_title}
      </h1>

      <div className="space-y-6">
        {Object.values(groupedByCinema).map((group: any) => (
          <div
            key={group.cinema.id}
            className="p-4 px-8 bg-white rounded-sm shadow-md border border-gray-200 flex"
          >
            <div className="w-2/5 ">
              <h2 className="text-xl font-semibold mb-1">
                {group.cinema.name}
              </h2>
              <p className="text-gray-500 mb-4 text-sm">
                {group.cinema.location}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 w-3/5 ">
              {group.shows.map((show: ShowWithHall) => (
                <Link
                  key={show.id}
                  href={`/movie/seatselection/${show.id}`}
                  className="px-4 py-2  text-muted-foreground text-sm flex flex-col items-center justify-center rounded-xs border-2 border-green-500 border-l-4 h-12 w-32"
                >
                  {new Date(Number(show.start)).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  <p className="text-[8px] font-bold text-muted-foreground">
                    Dolby Atmos
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
