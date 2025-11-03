"use client";

import { useEffect, useState } from "react";
import {
  Cinema,
  Hall,
  Movie,
  Seat,
  Show,
} from "../../../../../generated/prisma";
import { gqlClient } from "@/services/gql";
import { GET_SHOW_BY_ID } from "@/app/queries";
import { useParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export type SHOW_WITH_HALL_MOVIE = Show & {
  hall: Hall & { cinema: Cinema; seats: Seat[] };
  movie: Movie;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function SeatSelection() {
  const { id } = useParams();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [hall, setHall] = useState<Hall>();
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useUser();
  const currentUserId = currentUser.user?.id;
  const seatMap = [];
  useEffect(() => {
    async function fetchSeats() {
      try {
        const data: { getShowById: SHOW_WITH_HALL_MOVIE } =
          await gqlClient.request(GET_SHOW_BY_ID, { showId: id });
        setSeats(data.getShowById.hall.seats);
        setHall(data.getShowById.hall);
      } catch (err) {
        console.error("Failed to fetch seats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSeats();
  }, [id]);

  const toggleSeat = (seatId: string) => {
    setSelected((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
    console.log(selected);
  };

  const handleProceed = async () => {
    if (!selected.length) {
      alert("Please select at least one seat.");
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ showId: id, seats: selected, currentUserId }),
      });

      const data = await res.json();
      console.log("checkout response:", data);

      if (!res.ok || !data.url) {
        alert("Failed to create checkout: " + (data.error || "Unknown error"));
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong. See console for details.");
    }
  };

  const selectSeat = (seatId: string) => {
    setSelected((prev) => {
      const alreadySelected = prev.includes(seatId);

      if (alreadySelected) {
        return prev.filter((s) => s !== seatId);
      }

      if (prev.length >= 6) {
        toast.error("Can't select more than 6 seats!");
        return prev;
      }

      return [...prev, seatId];
    });
  };

  function renderSeatMap() {
    if (!hall) return null;
    const rows = [];

    for (let i = 0; i < hall.rows; i++) {
      const rowSeats = [];
      for (let j = 0; j < hall.columns; j++) {
        const seatLabel = `${String.fromCharCode(65 + i)}${j + 1}`;
        const seat = seats.find((seat) => seat.seat_no == seatLabel);
        const seatId = seat ? seat.id : "xx";
        const isSelected = selected.includes(seatId);

        rowSeats.push(
          <button
            key={seatId}
            onClick={() => selectSeat(seatId)}
            className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded border transition
    ${
      selected.includes(seatId)
        ? "bg-green-600 text-white"
        : "bg-white hover:bg-green-100"
    }`}
          >
            {seatLabel}
          </button>
        );
      }
      rows.push(
        <div key={i} className="flex justify-center gap-1 mb-1">
          {rowSeats}
        </div>
      );
    }
    return rows;
  }
  return (
    <main className="min-h-screen w-full flex  justify-center gap-4 p-10">
      <div className="w-5xl flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6">🎟 Select Your Seats</h1>

        {loading ? (
          <p className="text-gray-600">Loading seats...</p>
        ) : (
          <div className="min-h-160 bg-gray-100 rounded-xl p-6 shadow-md overflow-auto flex flex-col gap-2 justify-center max-w-5xl overflow-x-scroll">
            <h4 className="text-center h-8 text-white tracking-widest rounded-t-full p-2 w-full bg-gray-600 self-center">
              SCREEN
            </h4>
            {renderSeatMap()}
          </div>
        )}
      </div>
      {/* Bottom actions */}
      <div className=" flex gap-4 flex-col mt-20">
        <span className="px-4 py-2 text-black rounded-lg">
          Selected: {selected.length}
        </span>
        <button
          disabled={!selected.length}
          onClick={handleProceed}
          className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg disabled:bg-gray-400 cursor-pointer"
        >
          Proceed to Pay
        </button>
      </div>
    </main>
  );
}
