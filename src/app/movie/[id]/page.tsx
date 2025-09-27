import { notFound } from "next/navigation";
import { Movie } from "../../../../generated/prisma";
import Link from "next/link";
import { gql } from "graphql-request";
import { gqlClient } from "@/services/gql";

const GETMOVIEWITHID = gql`
  query GetMovieWithId($getMovieWithIdId: String!) {
    getMovieWithId(id: $getMovieWithIdId) {
      success
      movie {
        cover
        movie_title
        id
        overview
        popularity
        release_date
        thumbnail
      }
      message
    }
  }
`;

async function getMovie(id: string): Promise<Movie | null> {
  const data: {
    getMovieWithId: { success: boolean; movie: Movie; message: string };
  } = await gqlClient.request(GETMOVIEWITHID, { getMovieWithIdId: id });
  const res = data.getMovieWithId;
  if (res.success) return res.movie;
  return null;
}

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const movie = await getMovie(id);
  if (!movie) return notFound();

  return (
    <main className="w-full min-h-screen text-white">
      {/* Hero Section */}
      <section
        className="relative w-full h-[80vh] flex items-end"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start gap-8 bg-black/30 backdrop-blur-sm p-6 rounded-xl shadow-2xl ">
          {/* Poster */}
          <div className="w-56 shrink-0 rounded-lg overflow-hidden shadow-lg">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.thumbnail}`}
              alt={movie.movie_title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details with black shadow box */}
          <div>
            <h1 className="text-4xl font-bold mb-3">{movie.movie_title}</h1>
            <p className="text-lg text-gray-300 mb-4">{movie.overview}</p>

            {/* Ratings & Info */}
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="px-3 py-1 bg-pink-600 rounded-md text-sm font-medium">
                ⭐ 8.4/10 (39.8K Votes)
              </span>
              <span className="px-3 py-1 bg-gray-800 rounded-md text-sm">
                2D
              </span>
              <span className="px-3 py-1 bg-gray-800 rounded-md text-sm">
                Hindi
              </span>
              <span className="px-3 py-1 bg-gray-800 rounded-md text-sm">
                2h 37m
              </span>
              <span className="px-3 py-1 bg-gray-800 rounded-md text-sm">
                UA16+
              </span>
              <span className="px-3 py-1 bg-gray-800 rounded-md text-sm">
                {movie.release_date}
              </span>
            </div>

            {/* CTA */}
            <Link
              href="#"
              className="inline-block px-6 py-3 bg-pink-600 hover:bg-pink-700 text-lg font-semibold rounded-lg transition"
            >
              Book Tickets
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl text-black font-bold mb-4">About the movie</h2>
        <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
      </section>
    </main>
  );
}
