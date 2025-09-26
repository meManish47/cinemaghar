"use client";

import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Movie } from "../../../generated/prisma";

export default function Carousel({ slides }: { slides: Movie[] }) {
  const [current, setCurrent] = useState(0);
  const lastIndex = slides.length - 1;

  const previous = () => {
    if (current === 0) setCurrent(lastIndex);
    else setCurrent(current - 1);
  };

  const next = () => {
    if (current === lastIndex) setCurrent(0);
    else setCurrent(current + 1);
  };

  // Guard against an empty slides array
  if (!slides || slides.length === 0) {
    return <div>No slides to display.</div>;
  }

  // --- AUTOMATIC SLIDE ---
  // This useEffect hook sets up an interval to advance the slides automatically.
  useEffect(() => {
    // Set an interval to call the 'next' function every 5 seconds (5000 milliseconds)
    const interval = setInterval(() => {
      next();
    }, 3000); // You can adjust the timing here

    // This is a cleanup function.
    // It runs when the component is unmounted to prevent memory leaks.
    return () => clearInterval(interval);
  }, [current]); // The effect re-runs whenever the 'current' state changes.
  // This resets the timer after a manual button click.

  return (
    <div className="overflow-hidden h-full relative ">
      <div
        className="flex transition-transform h-full ease-out duration-700"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {/* Mapped slides now include the overlay */}
        {slides.map((s, i) => (
          <div key={i} className="relative w-full h-full  flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/original${s.cover}`}
              alt={s.movie_title || "Carousel image"}
              className="w-full h-full relative object-cover object-[80%_40%] " // Ensure image covers the area
            />

            <div
              className="absolute bottom-0 left-0 right-0 p-4 md:p-8 
                           bg-gradient-to-t from-black/90 to-transparent"
            >
              <h2 className="text-xl md:text-3xl font-bold text-white">
                {s.movie_title}
              </h2>
              <p className="mt-2 text-white/90 text-sm hidden md:block">
                {s.overview}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls (still available for manual navigation) */}
      <div className="absolute inset-0  w-full flex justify-between items-center px-4">
        <button
          onClick={previous}
          className="p-1 rounded-full bg-black/40 text-white/80 z-10 hover:bg-black/60"
        >
          <ArrowLeft size={32} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full bg-black/40 text-white/80 z-10 hover:bg-black/60"
        >
          <ArrowRight size={32} />
        </button>
      </div>
    </div>
  );
}
