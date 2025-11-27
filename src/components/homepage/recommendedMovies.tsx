import { Movie } from "../../../generated/prisma";
import MovieCard from "../movie/movieCard";

export default function RecommendedMovies({ movies }: { movies: Movie[] }) {
  if (!movies) return <div>Null</div>;

  const languages = [
    "English",
    "Hindi",
    "Tamil",
    "Telugu",
    "English 7D",
    "Malayalam",
    "Japanese",
    "Punjabi",
    "Gujarati",
    "Korean",
  ];

  return (
    <main>
      <div className="h-full w-full rounded-2xl flex flex-col gap-4 sm:px-16">
        <div className="flex justify-between items-center w-full ">
          <p className="text-xl sm:text-2xl font-bold tracking-wide">
            Recommended Movies
          </p>
        </div>
        <div className="w-full flex flex-wrap  gap-3 py-2">
          {languages.map((lang) => (
            <button
              key={lang}
              className="border border-gray-400 text-red-00 rounded-full text-red-700  bg-white px-4 py-1 text-xs "
            >
              {lang}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 justify-between">
          {movies.slice(25, 31).map((movie) => (
            <MovieCard movieItem={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
