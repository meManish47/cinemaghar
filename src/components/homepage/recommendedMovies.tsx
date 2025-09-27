import Link from "next/link";
import { Movie } from "../../../generated/prisma";
import MovieCard from "../movie/movieCard";

export default function RecommendedMovies({ movies }: { movies: Movie[] }) {
  if (!movies) return <div>Null</div>;
  return (
    <main>
      <div className="h-120 w-full  rounded-2xl p-4 flex flex-col gap-2 items-center">
        <div className="flex justify-between items-center w-full px-16">
          <p className="text-2xl font-bold tracking-wide">Recommended Movies</p>
          <Link href={"/"}>
            <p className="text-[#E7364D]">See all {`>`}</p>
          </Link>
        </div>
        <div className="flex flex-wrap">
          {movies.slice(25, 30).map((movie) => {
            return <MovieCard movieItem={movie} key={movie.id} />;
          })}
        </div>
      </div>
    </main>
  );
}
