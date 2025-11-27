"use client";

import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const covers = [
  "https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1762774640782_desktopjourney.jpg",
  "https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1763979457294_axwellsaraweb.jpeg",
  "https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1763016311773_kljwebnov.jpg",
  "https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1760430005960_popccweb.jpg",
];

export default function Carousel() {
  const slides = covers;
  const [current, setCurrent] = useState(1); // Start at first REAL slide

  // Clone last slide to beginning & first slide to end
  const extendedSlides = [
    slides[slides.length - 1],
    ...slides,
    slides[0],
  ];

  const previous = () => setCurrent((prev) => prev - 1);
  const next = () => setCurrent((prev) => prev + 1);

  // Loop jump effect
  useEffect(() => {
    if (current === 0) {
      setTimeout(() => setCurrent(slides.length), 300);
    }
    if (current === slides.length + 1) {
      setTimeout(() => setCurrent(1), 300);
    }
  }, [current]);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-6 flex items-center justify-center">
      
      {/* Track */}
      <div
        className="flex items-center transition-transform duration-700 ease-out w-[83%]"
        style={{
          transform: `translateX(calc(-${current * 100}%))`,
        }}
      >
        {extendedSlides.map((s, i) => {
          const isActive = i === current;

          return (
            <div
              key={i}
              className={`relative shrink-0 transition-all duration-500
              ${isActive ? "scale-100 opacity-100" : "scale-[0.90] opacity-50"}
              w-full`}
            >
              <div className="relative w-full h-[200px] md:h-[300px] rounded-sm overflow-hidden shadow-lg">
                <Image src={s} alt="slide" fill className="object-cover" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Left Arrow */}
      <button
        onClick={previous}
        className="absolute left-4 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full z-20 top-1/2 transition"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        className="absolute right-4 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full z-20 top-1/2 transition"
      >
        <ArrowRight size={24} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i + 1)}
            className={`w-3 h-3 rounded-full transition-all ${
              i + 1 === current
                ? "bg-white scale-110"
                : "bg-gray-300 opacity-45"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
