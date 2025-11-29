"use client";

import { useState } from "react";
import { Movie } from "../../../generated/prisma";
import MovieCard from "../movie/movieCard";

export default function RecommendedMovies({
  movies,
  setFilter,
}: {
  movies: Movie[];
  setFilter: (filter: { min: number; max: number }) => void;
}) {
  const [activeFilter, setActiveFilter] = useState(0);

  const popularityFilters = [
    { label: "🔥 Top Rated (80+)", min: 80, max: 999 },
    { label: "👍 Good (60-79)", min: 60, max: 79 },
    { label: "🙂 Average (40-59)", min: 40, max: 59 },
    { label: "💤 Low (<40)", min: 0, max: 39 },
  ];

  const handleFilterClick = (index: number) => {
    setActiveFilter(index);
    setFilter({
      min: popularityFilters[index].min,
      max: popularityFilters[index].max,
    });
  };

  return (
    <section className="h-full w-full rounded-2xl flex flex-col gap-5 sm:px-16">
      {/* Section Header */}
      <div className="flex justify-between items-center w-full">
        <p className="text-xl sm:text-2xl font-bold tracking-wide">
          Recommended Movies
        </p>
      </div>

      {/* Filters - BookMyShow Style */}
      <div className="flex flex-wrap gap-3  w-full py-4 rounded-lg   border-[#E82640] bg-gray-50 ">
        <p className="text-lg mx-2 font-bold">Poularity :</p>
        {popularityFilters.map((filterItem, index) => (
          <button
            key={filterItem.label}
            onClick={() => handleFilterClick(index)}
            className={`px-2 py-1.5 text-sm font-normal rounded-full transition-all duration-200 
            border cursor-pointer select-none
            ${
              activeFilter === index
                ? "bg-[#E82640] text-white border-red-600 shadow-md  scale-[1.01]"
                : "bg-white text-gray-600 border-gray-300 hover:bg-red-50 hover:border-red-500 hover:text-red-600"
            }`}
          >
            {filterItem.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-5 justify-between animate-fadeIn w-full ">
        {movies.length > 0 ? (
          movies.slice(0, 5).map((movie) => (
            <div key={movie.id} className="transition-opacity duration-200 ">
              <MovieCard movieItem={movie} />
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-sm py-4 italic">
            No movies found in this popularity range.
          </p>
        )}
      </div>
    </section>
  );
}
