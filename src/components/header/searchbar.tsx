"use client";

import { GET_ALL_MOVIES } from "@/app/queries";
import { gqlClient } from "@/services/gql";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Movie } from "../../../generated/prisma";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filtered, setFiltered] = useState<Movie[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res: { getAllMovies: Movie[] } = await gqlClient.request(
          GET_ALL_MOVIES
        );
        setMovies(res.getAllMovies);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setFiltered([]);
      setOpen(false);
      return;
    }

    const q = query.toLowerCase();
    const results = movies.filter((m) =>
      m.movie_title.toLowerCase().includes(q)
    );

    setFiltered(results);
    setOpen(results.length > 0);
  }, [query, movies]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node | null;
      if (
        containerRef.current &&
        target &&
        !containerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (movie: Movie) => {
    setQuery(movie.movie_title);
    setOpen(false);
    router.push(`/movie/${movie.id}`);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (filtered.length > 0) router.push(`/movie/${filtered[0].id}`);
  };

  return (
    <main className="relative" ref={containerRef}>
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 h-8 w-max items-center border border-gray-200 px-3 rounded-xs bg-white"
      >
        <button type="submit" className="cursor-pointer">
          <FaSearch color="gray" />
        </button>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-16 sm:w-120 border-0 h-full px-2 focus:outline-none placeholder:text-gray-500 placeholder:font-normal "
          placeholder="Search for Movies,Events,Plays and Sports"
        />
      </form>
      {open && (
        <ul className="absolute mt-1 bg-white shadow-md border border-gray-200 w-full rounded-md max-h-60 overflow-y-auto z-50">
          {filtered.map((movie) => (
            <li
              key={movie.id}
              onClick={() => handleSelect(movie)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm border-b-2"
            >
              {movie.movie_title}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
