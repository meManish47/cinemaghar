"use client";
import { Movie } from "../../../generated/prisma";
import MovieCard from "../movie/movieCard";

export default function RecommendedMovies({
  movies,
  setFilter,
}: {
  movies: Movie[];
  setFilter: (filter: { min: number; max: number }) => void;
}) {
  const popularityFilters = [
    { label: "🔥 Top Rated (80+)", min: 80, max: 999 },
    { label: "👍 Good (60-79)", min: 60, max: 79 },
    { label: "🙂 Average (40-59)", min: 40, max: 59 },
    { label: "💤 Low (<40)", min: 0, max: 39 },
  ];

  return (
    <main>
      <div className="h-full w-full rounded-2xl flex flex-col gap-4 sm:px-16">
        <div className="flex justify-between items-center w-full">
          <p className="text-xl sm:text-2xl font-bold tracking-wide">
            Recommended Movies
          </p>
        </div>

        <div className="w-full flex flex-wrap gap-3 py-2">
          {popularityFilters.map((item) => (
            <button
              key={item.label}
              onClick={() => setFilter({ min: item.min, max: item.max })}
              className="border border-gray-400 rounded-full bg-white px-4 py-1 text-xs
                         transition hover:bg-red-600 hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 justify-between ">
          {movies.slice(0, 5).map((movie) => (
            <MovieCard movieItem={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
