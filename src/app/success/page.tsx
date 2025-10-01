// src/app/success/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import QRCode from "react-qr-code";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [ticketData, setTicketData] = useState<any>(null);

  useEffect(() => {
    if (!sessionId) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/ticket?session_id=${sessionId}`);
        const data = await res.json();
        console.log("ticketdata", data);
        setTicketData(data);
      } catch (err) {
        console.error("Error fetching ticket:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sessionId]);

  if (loading) {
    return (
      <p className="min-h-screen  text-center mt-10">Loading your ticket...</p>
    );
  }

  if (!ticketData) {
    return (
      <p className="min-h-screen text-center mt-10 text-red-500">
        No ticket found.
      </p>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-2xl font-bold text-green-600 mb-6">
        Booking Confirmed 🎉
      </h1>

      {/* Ticket Card */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden">
        {/* Movie Poster */}
        <img
          src={
            `https://image.tmdb.org/t/p/w500${ticketData.moviePoster}` ||
            "/movie-placeholder.jpg"
          }
          alt="movie"
          className="w-full h-48 object-cover"
        />

        {/* Ticket Details */}
        <div className="p-6">
          <h2 className="text-xl font-bold">{ticketData.movieTitle}</h2>
          <p className="text-gray-600">{ticketData.cinemaName}</p>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">Date</p>
              <p>{ticketData.showDate.split("T")[0]}</p>
            </div>
            <div>
              <p className="font-semibold">Time</p>
              <p>{ticketData.showTime}</p>
            </div>
            <div>
              <p className="font-semibold">Seats</p>
              <p>{ticketData.seats?.join(", ")}</p>
            </div>
            <div>
              <p className="font-semibold">Screen</p>
              <p>{ticketData.screen || "Screen 1"}</p>
            </div>
          </div>

          {/* QR Code */}
          <div className="mt-6 flex justify-center">
            <QRCode value={sessionId!} size={128} />
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Scan this QR at entry
          </p>
        </div>

        {/* Perforation effect */}
        <div className="absolute top-48 left-0 w-full border-t border-dashed border-gray-300"></div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Download Ticket
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
}
