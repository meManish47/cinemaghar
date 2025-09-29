"use client";

import { useState } from "react";
import { gqlClient } from "@/services/gql";
import { ADD_SHOW } from "@/app/queries";

export default function AddShowForm({ movies, halls, onAdded }: any) {
  const [form, setForm] = useState({
    movieId: "",
    hallId: "",
    start: "",
    finish: "",
    date: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await gqlClient.request(ADD_SHOW, form);
    setForm({ movieId: "", hallId: "", start: "", finish: "", date: "" });
    if (onAdded) onAdded();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md border rounded-2xl p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">➕ Add Show</h2>

      <select
        value={form.movieId}
        onChange={(e) => setForm({ ...form, movieId: e.target.value })}
        required
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">Select Movie</option>
        {movies.map((m: any) => (
          <option key={m.id} value={m.id}>
            {m.movie_title}
          </option>
        ))}
      </select>

      <select
        value={form.hallId}
        onChange={(e) => setForm({ ...form, hallId: e.target.value })}
        required
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">Select Hall</option>
        {halls.map((h: any) => (
          <option key={h.id} value={h.id}>
            {h.hall_name} ({h.cinema.name})
          </option>
        ))}
      </select>

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
        className="w-full border rounded-lg px-3 py-2"
      />
      <input
        type="time"
        value={form.start}
        onChange={(e) => setForm({ ...form, start: e.target.value })}
        required
        className="w-full border rounded-lg px-3 py-2"
      />
      <input
        type="time"
        value={form.finish}
        onChange={(e) => setForm({ ...form, finish: e.target.value })}
        required
        className="w-full border rounded-lg px-3 py-2"
      />

      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Add Show
      </button>
    </form>
  );
}
