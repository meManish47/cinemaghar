import { gqlClient } from "@/services/gql";
import { gql } from "graphql-request";
import Carousel from "./carousel";
import { Movie } from "../../../generated/prisma";
import RecommendedMovies from "./recommendedMovies";

export default async function HomePage() {
  const GETALLMOVIESCOVERS = gql`
    query GetAllMovies {
      getAllMovies {
        cover
      }
    }
  `;
  const GETALLMOVIES = gql`
    query GetAllMovies {
      getAllMovies {
        movie_title
        cover
        thumbnail
        id
        release_date
        overview
        popularity
      }
    }
  `;
  const data: { getAllMovies: Movie[] } = await gqlClient.request(GETALLMOVIESCOVERS);
  const covers = await data.getAllMovies;
  const movieData: { getAllMovies: Movie[] } = await gqlClient.request(GETALLMOVIES);
  const movies = await movieData.getAllMovies;
  return (
    <main className=" w-full h-full mt-4 flex flex-col gap-8">
      <div className="h-80 w-full ">
         {covers && <Carousel slides={covers.slice(0, 20)} />}
      </div>
      <div className="h-full w-full px-32">
        <RecommendedMovies movies = {movies}/>
      </div>
    </main>
  );
}
