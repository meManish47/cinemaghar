"use client";

import { ShowItem } from "@/app/types";
import { useState } from "react";


export function ShowDialog({ shows }: { shows: ShowItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-red-500 underline cursor-pointer  ml-8"
      >
        View
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-xl p-6 relative">
            <h2 className="text-xl font-semibold mb-4">
              Shows ({shows.length})
            </h2>

            <div className="max-h-80 overflow-y-auto space-y-4 pr-2 text-sm">
              {shows.length === 0 ? (
                <p className="text-gray-500 text-center py-10">
                  No shows here.
                </p>
              ) : (
                shows.map((show, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg border space-y-2"
                  >
                    <p>
                      <b>Movie:</b> {show.movieTitle}
                    </p>

                    <p>
                      <b>Date:</b> {show.date}
                    </p>

                    <p>
                      <b>Start:</b> {show.start}
                    </p>

                    <p>
                      <b>End:</b> {show.end}
                    </p>

                    <p>
                      <b>Hall:</b> {show.hallName}
                    </p>

                    <p>
                      <b>Cinema:</b> {show.cinemaName} — {show.cinemaLocation}
                    </p>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-5 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
