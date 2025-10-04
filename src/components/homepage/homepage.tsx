"use client";

import { useEffect, useState } from "react";
import { gqlClient } from "@/services/gql";
import { gql } from "graphql-request";
import Carousel from "./carousel";
import RecommendedMovies from "./recommendedMovies";
import NavBar from "../header/navbar";
import { Movie } from "../../../generated/prisma";

export default function HomePage() {
  const [covers, setCovers] = useState<Movie[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        // Fetch both queries in parallel
        const [dataCovers, dataMovies] = await Promise.all([
          gqlClient.request<{ getAllMovies: Movie[] }>(GETALLMOVIESCOVERS),
          gqlClient.request<{ getAllMovies: Movie[] }>(GETALLMOVIES),
        ]);

        setCovers(dataCovers.getAllMovies);
        setMovies(dataMovies.getAllMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <main className="flex items-center justify-center h-screen w-full bg-white">
        <span className="loading loading-spinner loading-lg"></span>
      </main>
    );
  }

  return (
    <main className="w-full h-full mt-4 flex flex-col gap-8">
      <NavBar />

      <div className="h-80 w-full">
        {covers.length > 0 && <Carousel slides={covers.slice(0, 20)} />}
      </div>

      <div className="h-full w-full px-32">
        <RecommendedMovies movies={movies} />
      </div>
    </main>
  );
}
