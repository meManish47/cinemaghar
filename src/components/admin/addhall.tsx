"use client";
import { gqlClient } from "@/services/gql";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Cinema } from "../../../generated/prisma";
import { ADD_HALL, GET_CINEMAS } from "@/app/queries";

export default function AddHallForm({ onAdded }: { onAdded?: () => void }) {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [cinemaId, setCinemaId] = useState("");
  const [hallName, setHallName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);

  const load = async () => {
    const data: { getAllCinemas: Cinema[] } = await gqlClient.request(
      GET_CINEMAS
    );
    setCinemas(data.getAllCinemas);
  };
  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cinemaId) {
      toast.error("Please select Cinema!");
      return;
    }
    if (!hallName) {
      toast.error("Please enter hall name!");
      return;
    }
    if (capacity <= 0) {
      toast.error("Please enter valid capacity!");
      return;
    }
    const addData = await gqlClient.request(ADD_HALL, {
      hallName,
      cinemaId,
      capacity,
      rows,
      columns,
    });

    setHallName("");
    setCapacity(0);
    setCinemaId("");
    onAdded?.();
  };
  // console.log("cinemasafsdajfkhskdja", cinemas);
  return (
    <form onSubmit={handleSubmit} className="space-y-2 max-w-xl">
      <label className="text-muted-foreground ">Cinema :</label>
      <select
        value={cinemaId}
        onChange={(e) => setCinemaId(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="">Select Cinema</option>
        {cinemas.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <label className="text-muted-foreground ">Hall Name :</label>
      <input
        className="w-full border p-2 rounded"
        value={hallName}
        onChange={(e) => setHallName(e.target.value)}
        placeholder="Hall Name"
      />
      <label className="text-muted-foreground ">Capacity :</label>
      <input
        type="number"
        className="w-full border p-2 rounded mt-2"
        value={capacity}
        onChange={(e) => setCapacity(Number(e.target.value))}
        placeholder="Capacity"
      />
      <label className="text-muted-foreground ">Rows :</label>
      <input
        type="number"
        className="w-full border p-2 rounded mt-2"
        value={rows}
        onChange={(e) => setRows(Number(e.target.value))}
        placeholder="Rows"
      />
      <label className="text-muted-foreground ">Columns :</label>
      <input
        type="number"
        className="w-full border p-2 rounded mt-2"
        value={columns}
        onChange={(e) => setColumns(Number(e.target.value))}
        placeholder="Columns"
      />
      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
        Add Hall
      </button>
    </form>
  );
}
