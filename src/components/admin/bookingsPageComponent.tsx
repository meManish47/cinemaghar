"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { GET_BOOKINGS_BY_HALL } from "@/app/queries";
import { gqlClient } from "@/services/gql";
import { BookingWithSeats } from "@/app/types";

export default function BookingsPage({hallId}:{hallId:string}) {
  const [bookings, setBookings] = useState<BookingWithSeats[]>([]);
  const [filterDate, setFilterDate] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data: { getBookingsByHall: BookingWithSeats[] } =
        await gqlClient.request(GET_BOOKINGS_BY_HALL, { hallId });
      setBookings(data.getBookingsByHall);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hallId) load();
  }, [hallId]);

  const filtered = filterDate
    ? bookings.filter(
        (b) =>
          new Date(Number(b.createdAt)).toISOString().split("T")[0] ===
          filterDate
      )
    : bookings;

  return (
    <div className="h-screen p-6">
      <h1 className="text-3xl font-bold mb-2">
        {filterDate ? `Bookings of ${filterDate}` : "All Bookings"}
      </h1>

      <p className="text-gray-500 mb-6">
        {filterDate
          ? "Showing all bookings for the selected date."
          : "Showing all bookings for this hall."}
      </p>

      <div className="mb-5">
        <label className="text-sm font-medium text-gray-700">Select Date</label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="ms-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900  placeholder-gray-400 [color-scheme:light]"
        />

        {filterDate && (
          <button
            className="ml-2 text-red-500"
            onClick={() => setFilterDate("")}
          >
            Clear
          </button>
        )}
      </div>

      {loading && <p>Loading bookings...</p>}

      {!loading && filtered.length === 0 && (
        <p className="text-gray-500">No bookings found for this date.</p>
      )}

      <div className="space-y-4 h-120 overflow-auto ">
        {filtered.map((b) => (
          <div
            key={b.id}
            className="p-4 border rounded bg-gray-100 flex justify-between"
          >
            <div className="flex flex-col gap-2">
              <p>
                <b>Booking ID:</b> {b.id}
              </p>

              <p>
                <b>User:</b> {b.user.name} ({b.user.email})
              </p>

              <p>
                <b>Movie:</b> {b.show.movie.movie_title}
              </p>

              <p>
                <b>Show Date:</b>{" "}
                {new Date(Number(b.show.date)).toISOString().split("T")[0]}
              </p>

              <p>
                <b>Show Time:</b>{" "}
                {new Date(Number(b.show.start)).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              <p>
                <b>Seats:</b> {b.seats.map((s) => s.seat_no).join(", ")}
              </p>
            </div>
            <Image
              src={
                `https://image.tmdb.org/t/p/w500${b.show.movie.thumbnail}` ||
                "/placeholder.png"
              }
              width={120}
              height={100}
              alt="Movie Image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
