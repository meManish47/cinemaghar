"use client";

import { useEffect, useState } from "react";
import { gqlClient } from "@/services/gql";
import {
  DELETE_SHOW,
  GET_ALL_HALLS,
  GET_ALL_MOVIES,
  GET_ALL_SHOWS,
} from "@/app/queries";
import AddShowForm from "@/components/admin/addshows";
import { Movie } from "../../../../generated/prisma";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { HallsWithCinema, ShowWithHall } from "@/app/types";

export default function ShowsPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [halls, setHalls] = useState<HallsWithCinema[]>([]);
  const [loading, setLoading] = useState(true);
  const [shows, setShows] = useState<ShowWithHall[]>([]);

  const load = async () => {
    setLoading(true);
    const dataHalls: { getAllHalls: HallsWithCinema[] } =
      await gqlClient.request(GET_ALL_HALLS);
    const dataShows: { getAllShows: ShowWithHall[] } = await gqlClient.request(
      GET_ALL_SHOWS
    );
    const dataMovies: { getAllMovies: Movie[] } = await gqlClient.request(
      GET_ALL_MOVIES
    );
    setHalls(dataHalls.getAllHalls);
    setShows(dataShows.getAllShows);
    setMovies(dataMovies.getAllMovies);
    setLoading(false);
  };
  const handleShowDelete = async (id: string) => {
    await gqlClient.request(DELETE_SHOW, { showId: id });
    setShows((prev) => prev.filter((show) => show.id !== id));
    toast.success("Deleted");
  };

  useEffect(() => {
    load();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );

  return (
    <div className="w-full p-4 sm:p-6 flex sm:flex-row flex-col  items-start sm:gap-16 ">
      <div className="flex flex-col sm:justify-between gap-4 mb-8 w-max">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          📅 Manage Shows
        </h1>

        <div className="mb-10">
          <AddShowForm movies={movies} halls={halls} onAdded={load} />
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-700 mb-4">
          Upcoming Shows:
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ms-2 w-max ">
          {shows.length ? (
            shows.map((show) => (
              <div
                key={show.id}
                className="bg-white rounded-xl shadow p-4 border flex justify-between items-start gap-4 hover:shadow-md transition-all "
              >
                <div className="flex flex-col text-sm text-gray-700">
                  <p>
                    <span className="text-gray-500">Movie:</span>{" "}
                    {show.movie.movie_title}
                  </p>
                  <p>
                    <span className="text-gray-500">Schedule:</span>{" "}
                    {
                      `${new Date(Number(show.start) - 21600000)}`.split(
                        "GMT"
                      )[0]
                    }
                  </p>
                </div>

                <TrashIcon
                  className="cursor-pointer text-red-600 hover:text-red-800 transition"
                  onClick={() => handleShowDelete(show.id)}
                />
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-xl w-max">
              No upcoming shows currently
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
