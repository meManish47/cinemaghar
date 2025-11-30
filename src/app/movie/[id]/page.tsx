import { GETALLMOVIES, GETMOVIEWITHID, GET_ALL_MOVIES } from "@/app/queries";
import { MovieWithShow } from "@/app/types";
import MovieCard from "@/components/movie/movieCard";
import MovieDetailCard from "@/components/movie/movieDetailCard";
import { gqlClient } from "@/services/gql";
import { notFound } from "next/navigation";
import { Movie } from "../../../../generated/prisma";
import TopOffers from "@/components/movie/topoffers";

async function getMovie(id: string): Promise<MovieWithShow> {
  const data: {
    getMovieWithId: { success: boolean; movie: MovieWithShow; message: string };
  } = await gqlClient.request(GETMOVIEWITHID, {
    getMovieWithIdId: id,
  });
  const res = data.getMovieWithId;
  return res.movie;
}

async function getAllMovies(): Promise<Movie[]> {
  const data: { getAllMovies: Movie[] } = await gqlClient.request(GETALLMOVIES);
  return data.getAllMovies;
}

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovie(id);
  const allMovies = await getAllMovies();

  if (!movie) return notFound();

  return (
    <div className="flex flex-col gap-12">
      <MovieDetailCard movie={movie} />
      <div className="sm:px-51 mb-8 px-4">
        <TopOffers />
      </div>
      <p className="text-2xl sm:px-52 font-bold px-4">You might also like </p>
      <div className="sm:px-51 flex overflow-auto w-full scrollbar-hide gap-4 justify-between -mt-8 mb-16 px-4">
        {allMovies.slice(15, 20).map((movie) => (
          <MovieCard movieItem={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
