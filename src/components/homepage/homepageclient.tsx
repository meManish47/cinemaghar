"use client";

import { Movie } from "../../../generated/prisma";
import Carousel from "./carousel";
import RecommendedMovies from "./recommendedMovies";

export default function HomePageClient({
  covers,
  movies,
}: {
  covers: Movie[];
  movies: Movie[];
}) {
  return (
    <main className="w-full h-full  flex flex-col gap-8 pb-8 bg-[#F2F5F9]">
      <div className="h-72 w-full mb-8">
        {" "}
        <Carousel />
      </div>

      <div className="h-max w-full px-8 sm:px-16">
        <RecommendedMovies movies={movies} />
      </div>
    </main>
  );
}
