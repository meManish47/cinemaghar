"use client";

import { GET_ALL_SHOWS_WITH_DELETED } from "@/app/queries";
import { SHOW_WITH_HALL_MOVIE } from "@/app/types";
import { BookingsDialog } from "@/components/show/showBookingDialog";
import { gqlClient } from "@/services/gql";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ShowsPage() {
  const [shows, setShows] = useState<SHOW_WITH_HALL_MOVIE[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data: { getAllShowsWithDeltedOnes: SHOW_WITH_HALL_MOVIE[] } =
        await gqlClient.request(GET_ALL_SHOWS_WITH_DELETED);
      setShows(data.getAllShowsWithDeltedOnes);
      // console.log(data, "data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);
  // console.log("SHJHOWS", shows);
  return (
    <div className="w-full h-screen overflow-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Manage Shows
        </h1>

        <Link
          href="/admin/manageshows"
          className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 text-xs sm:text-sm"
        >
          ➕ Create New Show
        </Link>
      </div>

      {loading && (
        <p className="text-gray-500 text-center py-10 text-lg">
          Loading shows...
        </p>
      )}

      {!loading && shows?.length === 0 && (
        <p className="text-gray-600 bg-white border shadow p-6 rounded-xl text-center">
          No shows found. Click “Create New Show” to add one.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {shows?.map((show) => (
          <div key={show.id} className="bg-white  border  p-6 ">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={
                  `https://image.tmdb.org/t/p/w500${show.movie.thumbnail}` ||
                  "/placeholder.png"
                }
                className="w-20 h-28 object-cover rounded-lg border"
                alt="movie"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  🎬 {show.movie.movie_title}
                </h2>
                <p className="text-sm text-gray-500">{show.hall.cinema.name}</p>
                <p className="text-sm text-gray-400">
                  {show.hall.cinema.location}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-100 rounded-lg p-3">
                <span className="text-gray-600">Hall</span>
                <p className="text-gray-800 font-semibold">
                  {show.hall.hall_name}
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex w-full justify-between">
                  <p className="text-gray-600">Bookings</p>{" "}
                  <BookingsDialog bookings={show.bookings} />
                </div>
                <p className="text-gray-800 font-semibold">
                  {show.bookings.length}
                </p>
              </div>

              <div className="bg-gray-100 col-span-2 rounded-lg p-3">
                <span className="text-gray-600">Date</span>
                <p className="text-gray-800 font-semibold">
                  {new Date(Number(show.date)).toISOString().split("T")[0]}
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-3">
                <span className="text-gray-600">Start</span>
                <p className="text-gray-800 font-semibold">
                  {new Date(Number(show.start)).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "UTC",
                  })}
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-3">
                <span className="text-gray-600">End</span>
                <p className="text-gray-800 font-semibold">
                  {new Date(Number(show.finish)).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "UTC",
                  })}
                </p>
              </div>
            </div>

            {/* MANAGE BUTTON */}
            {/* <Link
              href={`/admin/shows/${show.id}`}
              className="block mt-4 bg-blue-600 text-white text-center py-2 rounded-lg text-sm hover:bg-blue-700 transition"
            >
              Manage Show
            </Link> */}
          </div>
        ))}
      </div>
    </div>
  );
}
