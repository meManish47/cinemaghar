"use client";

import { useState } from "react";
import { Movie } from "../../../generated/prisma";
import Carousel from "./carousel";
import RecommendedMovies from "./recommendedMovies";
import LiveEventsSection from "../main/liveveents";

export default function HomePageClient({
  covers,
  movies,
}: {
  covers: Movie[];
  movies: Movie[];
}) {
  const [filter, setFilter] = useState({ min: 80, max: 999 });

  const filteredMovies = movies.filter(
    (m) => m.popularity >= filter.min && m.popularity <= filter.max
  );
  return (
    <main className="w-full h-full flex flex-col gap-8 sm:pb-8  bg-[#F2F5F9]">
      <div className="sm:h-72 w-full sm:mb-8 ">
        <Carousel />
      </div>

      <div className="h-max w-full px-8 sm:px-16">
        <RecommendedMovies movies={filteredMovies} setFilter={setFilter} />
      </div>

      <div className="relative   w-full sm:px-32 px-8 my-8 overflow-hidden">
        <img
          src="/bannerwithlogo.png"
          className="rounded-xl h-14 sm:w-full sm:h-full  "
          alt="Banner"
        />
      </div>

      <div className="w-full sm:px-32 pl-8">
        <LiveEventsSection />
      </div>
    </main>
  );
}
