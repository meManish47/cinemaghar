import { notFound } from "next/navigation";
import { Movie, Show } from "../../../../generated/prisma";
import Link from "next/link";
import { gqlClient } from "@/services/gql";
import { GETMOVIEWITHID } from "@/app/queries";

type MovieWithShow = Movie & { shows: Show[] };
async function getMovie(id: string): Promise<MovieWithShow | null> {
  const data: {
    getMovieWithId: { success: boolean; movie: MovieWithShow; message: string };
  } = await gqlClient.request(GETMOVIEWITHID, { getMovieWithIdId: id });
  const res = data.getMovieWithId;
  if (res.success) return res.movie;
  return null;
}

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovie(id);
  if (!movie) return notFound();
  // console.log(movie);
  return (
    <main className="w-full min-h-screen text-white sm:pt-4">
      <section
        className="relative w-full h-[70vh] sm:h-[80vh] flex items-end "
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row items-start gap-4 sm:gap-8 bg-black/40 backdrop-blur-sm sm:rounded-xl shadow-2xl mb-4 sm:mb-8">
          <div className="w-32 sm:w-48 md:w-56 rounded-lg overflow-hidden shadow-lg self-center md:self-start">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.thumbnail}`}
              alt={movie.movie_title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center md:text-left w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
              {movie.movie_title}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 line-clamp-4 sm:line-clamp-none">
              {movie.overview}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 mb-4 sm:mb-6 text-xs sm:text-sm">
              <span className="px-2 py-1 bg-pink-600 rounded-md font-medium">
                ⭐ 8.4/10
              </span>
              <span className="px-2 py-1 bg-gray-800 rounded-md">2D</span>
              <span className="px-2 py-1 bg-gray-800 rounded-md">Hindi</span>
              <span className="px-2 py-1 bg-gray-800 rounded-md">2h 37m</span>
              <span className="px-2 py-1 bg-gray-800 rounded-md">UA 16+</span>
            </div>

            <Link
              href={`/movie/buytickets/${movie.id}`}
              className={`inline-block px-5 py-3 text-sm sm:text-lg font-semibold rounded-lg transition w-full sm:w-auto text-center
                ${
                  movie.shows.length
                    ? "bg-pink-600 hover:bg-pink-700"
                    : "bg-gray-600 cursor-not-allowed pointer-events-none"
                }`}
            >
              {movie.shows.length ? "Book Tickets" : "No Shows Available"}
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <h2 className="text-xl sm:text-2xl text-black font-bold mb-3 sm:mb-4">
          About the Movie
        </h2>
        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
          {movie.overview}
        </p>
      </section>
    </main>
  );
}
