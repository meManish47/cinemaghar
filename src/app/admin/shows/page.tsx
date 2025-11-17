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
import { HallsWithCinema } from "../halls/page";
import { Movie } from "../../../../generated/prisma";
import { ShowWithHall } from "@/app/movie/buytickets/[id]/page";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

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
    toast.success("Deleted")
  };
  useEffect(() => {
    load();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">📅 Manage Shows</h1>
      </div>

      <div className="mb-10">
        <AddShowForm movies={movies} halls={halls} onAdded={load} />
      </div>
      <p className="text-gray-500">
        <h1>Upcoming Shows:</h1>
        {shows.map((show) => {
          return (
            <div className="mx-4 h-max w-max text-black  rounded-2xl drop-shadow-2xl flex justify-between  px-4 py-2 border-2 gap-2">
              <div className="flex flex-col">
                <p>
                  <span className="text-muted-foreground">Movie:</span>{" "}
                  {show.movie.movie_title}
                </p>
                <p>
                  <span className="text-muted-foreground">Schedule:</span>
                  {`${new Date(Number(show.start) - 21600000)}`.split("GMT")[0]}
                </p>
              </div>
              <TrashIcon
                className="cursor-pointer"
                onClick={() => {
                  handleShowDelete(show.id);
                }}
              />
            </div>
          );
        })}
      </p>
    </div>
  );
}
