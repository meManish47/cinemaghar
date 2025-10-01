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
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useUser();
  const currentUserId = currentUser.user?.id;
  useEffect(() => {
    async function fetchSeats() {
      try {
        const data: { getShowById: SHOW_WITH_HALL_MOVIE } =
          await gqlClient.request(GET_SHOW_BY_ID, { showId: id });

        setSeats(data.getShowById.hall.seats);
      } catch (err) {
        console.error("Failed to fetch seats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSeats();
  }, [id]);

  // group seats by row_no
  const grouped = seats.reduce((acc, seat) => {
    if (!acc[seat.row_no]) acc[seat.row_no] = [];
    acc[seat.row_no].push(seat);
    return acc;
  }, {} as Record<number, Seat[]>);

  // toggle seat select/unselect
  const toggleSeat = (seatId: string) => {
    setSelected((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  // proceed handler with Stripe
  const handleProceed = async () => {
    console.log("Proceeding with seats:", selected);

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

      // Redirect user to Stripe Checkout page
      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong. See console for details.");
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold mb-6">🎟 Select Your Seats</h1>

      {loading ? (
        <p className="text-gray-600">Loading seats...</p>
      ) : (
        <div className="h-160 w-320 bg-gray-100 rounded-xl p-6 shadow-md overflow-auto">
          {Object.keys(grouped)
            .sort((a, b) => Number(a) - Number(b))
            .map((row) => (
              <div key={row} className="flex gap-2 mb-4 justify-center">
                <span className="w-6 font-bold text-gray-700">
                  {String.fromCharCode(64 + Number(row))}
                </span>

                {grouped[Number(row)]
                  .sort((a, b) => a.seat_no - b.seat_no)
                  .map((seat) => {
                    const isSelected = selected.includes(seat.id);
                    const isBooked = (seat as any).isBooked;

                    return (
                      <button
                        key={seat.id}
                        onClick={() => toggleSeat(seat.id)}
                        disabled={isBooked}
                        className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded 
                          border transition
                          ${
                            isBooked
                              ? "bg-gray-400 cursor-not-allowed text-white"
                              : isSelected
                              ? "bg-green-600 text-white"
                              : "bg-white hover:bg-green-100"
                          }`}
                      >
                        {seat.seat_no}
                      </button>
                    );
                  })}
              </div>
            ))}
        </div>
      )}

      {/* Bottom actions */}
      <div className="mt-6 flex gap-4">
        <span className="px-4 py-2 bg-green-600 text-white rounded-lg">
          Selected: {selected.length}
        </span>
        <button
          disabled={!selected.length}
          onClick={handleProceed}
          className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg disabled:bg-gray-400"
        >
          Proceed to Pay
        </button>
      </div>
    </main>
  );
}
