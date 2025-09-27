"use client";

import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Movie } from "../../../generated/prisma";
import Image from "next/image";

export default function Carousel({ slides }: { slides: Movie[] }) {
  const [current, setCurrent] = useState(0);
  const lastIndex = slides.length - 1;

  const previous = () => {
    setCurrent(current === 0 ? lastIndex : current - 1);
  };

  const next = () => {
    setCurrent(current === lastIndex ? 0 : current + 1);
  };

  if (!slides || slides.length === 0) {
    return <div>No slides to display.</div>;
  }

  // Automatic slide
  useEffect(() => {
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="overflow-hidden h-full relative">
      <div
        className="flex transition-transform h-full ease-out duration-700"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((s, i) => (
          <div key={i} className="relative w-full h-full flex-shrink-0">
            {/* Next.js Image with fill */}
            <div className="relative w-full h-full">
              <Image
                src={`https://image.tmdb.org/t/p/original${s.cover}`}
                alt={s.movie_title || "Carousel image"}
                fill
                style={{ objectFit: "cover", objectPosition: "80% 30%" }}
                priority={i === 0} // optional: preload first slide
              />
            </div>

            {/* Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black/90 to-transparent z-10">
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

      {/* Controls */}
      <div className="absolute inset-0 w-full flex justify-between items-center px-4">
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
