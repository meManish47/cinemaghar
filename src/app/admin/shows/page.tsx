"use client";

import { useEffect, useState } from "react";
import { gqlClient } from "@/services/gql";
import { GET_ALL_HALLS, GET_ALL_MOVIES } from "@/app/queries";
import AddShowForm from "@/components/admin/addshows";
import { HallsWithCinema } from "../halls/page";
import { Movie } from "../../../../generated/prisma";

export default function ShowsPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [halls, setHalls] = useState<HallsWithCinema[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const dataHalls: { getAllHalls: HallsWithCinema[] } =
      await gqlClient.request(GET_ALL_HALLS);
    const dataMovies: { getAllMovies: Movie[] } = await gqlClient.request(
      GET_ALL_MOVIES
    );
    setHalls(dataHalls.getAllHalls);
    setMovies(dataMovies.getAllMovies);
    setLoading(false);
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

      {/* Future: list existing shows */}
      <p className="text-gray-500">
        (Coming soon) List of all shows will appear here...
      </p>
    </div>
  );
}
