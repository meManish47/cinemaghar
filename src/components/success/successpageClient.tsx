"use client";

import QRCode from "react-qr-code";
import Image from "next/image";
import { TicketResponse } from "@/app/success/page";

type Props = {
  ticketData: TicketResponse;
  sessionId: string;
};

export default function SuccessPageClient({ ticketData, sessionId }: Props) {
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
        <Image
          src={
            ticketData.moviePoster
              ? `https://image.tmdb.org/t/p/w500${ticketData.moviePoster}`
              : "/movie-placeholder.jpg"
          }
          alt={ticketData.movieTitle}
          width={500}
          height={192}
          className="w-full h-48 object-cover"
        />

        {/* Ticket Details */}
        <div className="p-6">
          <h2 className="text-xl font-bold">{ticketData.movieTitle}</h2>
          <p className="text-gray-600">{ticketData.cinemaName}</p>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">Date</p>
              <p>{ticketData.showDate?.split("T")[0]}</p>
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
              <p className="font-semibold">Cinema</p>
              <p>
                {ticketData.cinemaName || "Cinema"} ({ticketData.hallName})
              </p>
            </div>
          </div>

          {/* QR Code */}
          <div className="mt-6 flex justify-center">
            <QRCode value={sessionId} size={128} />
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
          onClick={() => (window.location.href = "/")}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
}
