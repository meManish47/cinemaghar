"use client";

import Image from "next/image";
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
  return (
    <main className="w-full h-full  flex flex-col gap-8 pb-8 bg-[#F2F5F9]">
      <div className="h-72 w-full mb-8">
        {" "}
        <Carousel />
      </div>

      <div className="h-max w-full px-8 sm:px-16">
        <RecommendedMovies movies={movies} />
      </div>
      <div className="w-full sm:px-32 px-8 my-8">
        <Image
          src={"/banneravif.avif"}
          alt="Banner"
          width={2800}
          height={100}
        />
      </div>
      <div className="w-full sm:px-32 px-8">
        <LiveEventsSection />
      </div>
    </main>
  );
}
