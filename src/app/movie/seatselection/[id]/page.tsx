"use client";

import { GET_SHOW_BY_ID } from "@/app/queries";
import { gqlClient } from "@/services/gql";
import { useUser } from "@clerk/nextjs";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Hall, Seat } from "../../../../../generated/prisma";
import { SHOW_WITH_HALL_MOVIE } from "@/app/types";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function SeatSelection() {
  const { id } = useParams();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [bookedSeatsIds, setBookedSeatsIds] = useState<string[]>([]);
  const [hall, setHall] = useState<Hall>();
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
        setHall(data.getShowById.hall);

        const confirmedSeatIds = data.getShowById.bookings.reduce<string[]>(
          (acc, booking) => {
            booking.seats.forEach((seatobj) => acc.push(seatobj.id));
            return acc;
          },
          []
        );
        // console.log("-_-_--", confirmedSeatIds);
        setBookedSeatsIds(confirmedSeatIds);
      } catch (err) {
        console.error("Failed to fetch seats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSeats();
  }, [id]);

  const handleProceed = async () => {
    if (!selected.length) {
      toast.error("Please select at least one seat.");
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ showId: id, seats: selected, currentUserId }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        alert("Failed to create checkout: " + (data.error || "Unknown error"));
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong.");
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
      const rowLabel = String.fromCharCode(65 + i); // A, B, C etc

      const rowSeats = [];

      for (let j = 0; j < hall.columns; j++) {
        const seatNumber = j + 1;
        const seatLabel = `${rowLabel}${seatNumber}`;

        const seat = seats.find((seat) => seat.seat_no === seatLabel);
        const seatId = seat ? seat.id : "xx";
        const isBooked = bookedSeatsIds.includes(seatId);
        const isSelected = selected.includes(seatId);

        rowSeats.push(
          <button
            key={seatId}
            disabled={isBooked}
            onClick={() => selectSeat(seatId)}
            className={`w-8 h-8 flex items-center justify-center text-[10px] font-medium rounded-md border transition-all
            ${
              isBooked
                ? "bg-gray-400/60 text-white cursor-not-allowed"
                : isSelected
                ? "bg-green-500 text-white scale-110 shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-green-100"
            }
          `}
          >
            {seatNumber}
          </button>
        );
      }

      rows.push(
        <div key={i} className="flex items-center gap-2 mb-1">
          {/* Row Label on Left (only A, B, C...) */}
          <span className="w-4 text-sm font-semibold text-gray-700">
            {rowLabel}
          </span>

          <div className="flex gap-2">{rowSeats}</div>

          {/* Row Label on Right (optional like BookMyShow) */}
          <span className="w-4 text-sm font-semibold text-gray-700">
            {rowLabel}
          </span>
        </div>
      );
    }

    return rows;
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center p-6 relative bg-gray-50 pb-24">
      <h1 className="text-3xl font-bold mb-6 tracking-wide">
        Select Your Seats
      </h1>

      <div className="bg-gray-800 text-white text-center px-6 py-3 rounded-t-xl shadow-md mb-4 tracking-wider w-96">
        SCREEN THIS WAY
      </div>

      {/* SEAT MAP */}
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl w-full overflow-auto border border-gray-200">
        {loading ? (
          <p className="text-center text-gray-500">Loading seats...</p>
        ) : (
          <div className="flex flex-col items-center sm:gap-3 overflow-auto w-max">
            {renderSeatMap()}
          </div>
        )}
      </div>

      {/* FOOTER ACTION BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-white py-4 border-t shadow-lg flex justify-center items-center gap-6">
        <div className="text-lg font-semibold">
          Selected: <span className="text-green-600">{selected.length}</span>
        </div>

        <button
          disabled={!selected.length}
          onClick={handleProceed}
          className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white text-lg font-semibold rounded-lg disabled:bg-gray-400 cursor-pointer"
        >
          Proceed to Pay
        </button>
      </div>
    </main>
  );
}
