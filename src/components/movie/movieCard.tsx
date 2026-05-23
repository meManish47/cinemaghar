import Link from "next/link";
import { Movie } from "../../../generated/prisma";
import Image from "next/image";

export default function MovieCard({ movieItem }: { movieItem: Movie }) {
  return (
    <div
      key={movieItem.id}
      className="w-52  min-h-max backdrop-blur-xl p-1   flex flex-col items-start justify-center gap-2"
    >
      <Link href={`/movie/${movieItem.id}`}>
        {movieItem.thumbnail && (
          <div className="w-full h-76 aspect-2/3 overflow-hidden rounded-md">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movieItem.thumbnail}`}
              alt={movieItem.movie_title}
              className="h-full w-full object-cover  rounded-md shadow hover:scale-[1.02] transition ease-in-out duration-400"
              height={1000}
              width={1000}
              placeholder="blur"
              blurDataURL="/image.png"
            />
          </div>
        )}
      </Link>
      <p className="text-black font-medium text-lg tracking-wide  line-clamp-2 leading-snug w-48 h-6 overflow-hidden truncate">
        {movieItem.movie_title}
      </p>
      <p className="text-gray-500 font-normal text-sm text-center line-clamp-2 leading-snug h-4 overflow-hidden">
        {movieItem.release_date}
      </p>
    </div>
  );
}
