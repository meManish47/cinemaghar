"use client";

import { ADD_SHOW } from "@/app/queries";
import { AddShowFormProps, ShowForm } from "@/app/types";
import { gqlClient } from "@/services/gql";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function AddShowForm({
  movies,
  halls,
  onAdded,
}: AddShowFormProps) {
  const [form, setForm] = useState<ShowForm>({
    movieId: "",
    hallId: "",
    start: "",
    finish: "",
    date: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.movieId ||
      !form.date ||
      !form.finish ||
      !form.hallId ||
      !form.start
    ) {
      toast.error("Please fill all details!");
      return;
    }
    await gqlClient.request(ADD_SHOW, form);
    setForm({ movieId: "", hallId: "", start: "", finish: "", date: "" });
    if (onAdded) onAdded();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" py-6 space-y-4 w-full max-w-xl bg-white mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">➕ Add Show</h2>

      <div className="flex flex-col gap-1">
        <Label className="text-sm font-medium">Select Movie</Label>
        <select
          value={form.movieId}
          onChange={(e) => setForm({ ...form, movieId: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 bg-white"
        >
          <option value="">Select Movie</option>
          {movies.map((m) => (
            <option key={m.id} value={m.id}>
              {m.movie_title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <Label className="text-sm font-medium">Select Hall</Label>
        <select
          value={form.hallId}
          onChange={(e) => setForm({ ...form, hallId: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 bg-white"
        >
          <option value="">Select Hall</option>
          {halls.map((h) => (
            <option key={h.id} value={h.id}>
              {h.hall_name} ({h.cinema.name})
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <Label className="text-sm font-medium">Release Date:</Label>
        <Input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full sm:w-auto border rounded-lg px-3 py-2"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <Label className="text-sm font-medium">Start Time:</Label>
        <Input
          type="time"
          value={form.start}
          onChange={(e) => setForm({ ...form, start: e.target.value })}
          className="w-full sm:w-auto border rounded-lg px-3 py-2"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <Label className="text-sm font-medium">End Time:</Label>
        <Input
          type="time"
          value={form.finish}
          onChange={(e) => setForm({ ...form, finish: e.target.value })}
          className="w-full sm:w-auto border rounded-lg px-3 py-2"
        />
      </div>

      <Button
        type="submit"
        className="bg-red-600 text-white w-full py-2 rounded-lg hover:bg-red-700 transition"
      >
        Add Show
      </Button>
    </form>
  );
}
