import { Movie } from "../../../generated/prisma";
import MovieCard from "../movie/movieCard";

export default function RecommendedMovies({ movies }: { movies: Movie[] }) {
  if (!movies) return <div>Null</div>;
  return (
    <main>
      <div className="h-full w-full  rounded-2xl p-4 flex flex-col gap-2 sm:px-16">
        <div className="flex justify-between items-center w-full ">
          <p className="text-xl sm:text-2xl font-bold tracking-wide">
            Recommended Movies
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-between">
          {movies.slice(20, 25).map((movie) => {
            return <MovieCard movieItem={movie} key={movie.id} />;
          })}
        </div>
      </div>
    </main>
  );
}
