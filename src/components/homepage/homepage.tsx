import { gqlClient } from "@/services/gql";
import { gql } from "graphql-request";
import Carousel from "./carousel";
import { Movie } from "../../../generated/prisma";

export default async function HomePage() {
  const GETALLMOVIES = gql`
    query GetAllMovies {
      getAllMovies {
        cover
      }
    }
  `;
  const data: { getAllMovies: Movie[] } = await gqlClient.request(GETALLMOVIES);
  const covers = await data.getAllMovies;
  return (
    <main className=" w-full h-full mt-4">
      <div className="h-80 w-full">
        <Carousel slides={covers.slice(0, 20)} />
      </div>
    </main>
  );
}
