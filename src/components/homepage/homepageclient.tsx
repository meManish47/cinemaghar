"use client";

import { Movie } from "../../../generated/prisma";
import NavBar from "../header/navbar";
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
    <main className="w-full h-full mt-4 flex flex-col gap-8 pb-8 ">
      <NavBar />

      <div className="h-80 w-full">
        {covers.length > 0 && <Carousel slides={covers.slice(0, 20)} />}
      </div>

      <div className="h-max w-full px-8 sm:px-16">
        <RecommendedMovies movies={movies} />
      </div>
    </main>
  );
}
