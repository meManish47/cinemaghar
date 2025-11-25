"use client";

import { useEffect, useState } from "react";
import {
  Booking,
  Cinema,
  Hall,
  Movie,
  Seat,
  Show,
  User,
} from "../../../../../generated/prisma";
import { gqlClient } from "@/services/gql";
import { GET_SHOW_BY_ID } from "@/app/queries";
import { useParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { BookingWithSeats } from "@/components/show/showBookingDialog";

export type SHOW_WITH_HALL_MOVIE = Show & {
  hall: Hall & { cinema: Cinema; seats: Seat[] };
  movie: Movie;
  bookings: BookingWithSeats[];
};

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

        const arr = data.getShowById.bookings.map((booking) => {
          const newArr = booking.seats.map((seatobj) => seatobj.id);
          return newArr;
        });

        arr.forEach((booking) => {
          booking.forEach((seatId) => {
            setBookedSeatsIds((prev) => [...prev, seatId]);
          });
        });
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
      const rowSeats = [];
      for (let j = 0; j < hall.columns; j++) {
        const seatLabel = `${String.fromCharCode(65 + i)}${j + 1}`;
        const seat = seats.find((seat) => seat.seat_no === seatLabel);
        const seatId = seat ? seat.id : "xx";
        const isBooked = bookedSeatsIds.includes(seatId);
        const isSelected = selected.includes(seatId);

        rowSeats.push(
          <button
            key={seatId}
            disabled={isBooked}
            onClick={() => selectSeat(seatId)}
            className={`w-9 h-9 flex items-center justify-center text-xs font-semibold rounded-md border shadow-sm transition-all
              ${
                isBooked
                  ? "bg-gray-400/70 text-white cursor-not-allowed"
                  : isSelected
                  ? "bg-green-600 text-white scale-105"
                  : "bg-white hover:bg-green-100"
              }`}
          >
            {seatLabel}
          </button>
        );
      }

      rows.push(
        <div key={i} className="flex justify-center gap-2 mb-2">
          {rowSeats}
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

      <div className="bg-gray-900 text-white text-center w-80 p-2 rounded-t-xl shadow-lg mb-3">
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
          className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white text-lg font-semibold rounded-lg disabled:bg-gray-400"
        >
          Proceed to Pay
        </button>
      </div>
    </main>
  );
}
