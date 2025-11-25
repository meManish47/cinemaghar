import Link from "next/link";
import { Movie } from "../../../generated/prisma";

export default function MovieCard({ movieItem }: { movieItem: Movie }) {
  return (
    <div
      key={movieItem.id}
      className="w-56 min-h-max backdrop-blur-xl p-1 rounded-md shadow-md hover:shadow-xl transition duration-300 ease-in-out flex flex-col items-center justify-center gap-2"
    >
      <Link href={`/movie/${movieItem.id}`}>
        {movieItem.thumbnail && (
          <div className="w-full h-full overflow-hidden rounded-md">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieItem.thumbnail}`}
              alt={movieItem.movie_title}
              className=" object-cover rounded-md shadow hover:scale-[1.02] transition ease-in-out duration-400"
            />
          </div>
        )}
      </Link>
      <p className="text-black font-medium text-md tracking-wide text-center line-clamp-2 leading-snug h-8 overflow-hidden">
        {movieItem.movie_title}
      </p>
      <p className="text-gray-500 font-normal text-sm text-center line-clamp-2 leading-snug h-10 overflow-hidden">
        {movieItem.release_date}
      </p>
    </div>
  );
}
