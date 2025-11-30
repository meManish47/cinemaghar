"use client";

import { GET_ALL_HALLS } from "@/app/queries";
import { HallsWithCinema } from "@/app/types";
import { ShowDialog } from "@/components/show/showDialog";
import { gqlClient } from "@/services/gql";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HallsPage() {
  const [halls, setHalls] = useState<HallsWithCinema[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data: { getAllHalls: HallsWithCinema[] } = await gqlClient.request(
        GET_ALL_HALLS
      );
      setHalls(data.getAllHalls);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="w-full min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Manage Halls
        </h1>

        <Link
          href="/admin/managehalls"
          className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 text-xs sm:text-sm"
        >
          ➕ Add New Hall
        </Link>
      </div>

      {loading && (
        <p className="text-gray-500 text-center py-10 text-lg">
          Loading halls...
        </p>
      )}

      {!loading && halls.length === 0 && (
        <p className="text-gray-600 bg-white border shadow p-6 rounded-xl text-center">
          No halls found. Click “Add New Hall” to create one.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {halls.map((hall) => {
          const totalShows = hall.shows.length;

          const totalBookings = hall.shows.reduce(
            (sum, show) => sum + show.bookings.length,
            0
          );

          const totalBookedSeats = hall.shows.reduce(
            (sum, show) =>
              sum +
              show.bookings.reduce((s, b) => s + (b.seats.length || 0), 0),
            0
          );

          return (
            <div key={hall.id} className="bg-white  border  p-6 ">
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                🏟️ {hall.hall_name}
              </h2>

              <p className="text-gray-500 text-sm mb-4">
                {hall.cinema.name} — {hall.cinema.location}
              </p>

              <div className="flex justify-between text-sm mb-4">
                <span className="font-semibold text-gray-700">
                  Capacity: {hall.capacity}
                </span>
                <span className="font-semibold text-gray-700">
                  Layout: {hall.rows}×{hall.columns}
                </span>
              </div>

              <div className="bg-gray-100 p-3 rounded-lg mb-4">
                <div className="space-y-2 text-sm">
                  <p className=" flex justify-between">
                    <span>
                      <b>Total Shows:</b> {totalShows}
                    </span>
                    <ShowDialog
                      shows={hall.shows.map((show) => ({
                        movieTitle: show.movie.movie_title,
                        date: new Date(Number(show.date))
                          .toISOString()
                          .split("T")[0],
                        start: new Date(Number(show.start)).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            timeZone: "UTC",
                          }
                        ),
                        end: new Date(Number(show.finish)).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        ),
                        hallName: hall.hall_name,
                        cinemaName: hall.cinema.name,
                        cinemaLocation: hall.cinema.location,
                      }))}
                    />
                  </p>

                  <p className=" flex justify-between">
                    <span>
                      <b>Total Bookings:</b> {totalBookings}
                    </span>
                    <Link
                      href={`/admin/bookings?hallId=${hall.id}`}
                      className="text-red-500 underline cursor-pointer ml-8"
                    >
                      View
                    </Link>
                  </p>

                  <p>
                    <b>Total Seats Booked:</b> {totalBookedSeats}
                  </p>
                </div>
              </div>

              <div className="bg-gray-100 p-3 rounded-lg">
                <h3 className="text-gray-700 font-medium mb-2">Shows:</h3>

                {hall.shows.length === 0 ? (
                  <p className="text-gray-500 text-sm">No shows scheduled</p>
                ) : (
                  <ul className="space-y-2 max-h-40 overflow-y-auto text-sm">
                    {hall.shows.map((show) => (
                      <li
                        key={show.id}
                        className="bg-white rounded border px-3 py-2 flex justify-between"
                      >
                        <span>{show.movie?.movie_title}</span>

                        <span className="text-gray-500 text-xs">
                          {`${
                            new Date(Number(show.date))
                              .toISOString()
                              .split("T")[0]
                          } — ${new Date(Number(show.start)).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              timeZone: "UTC",
                            }
                          )}`}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
