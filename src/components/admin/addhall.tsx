"use client";
import { useState, useEffect } from "react";
import { gql } from "graphql-request";
import { gqlClient } from "@/services/gql";
import { Cinema } from "../../../generated/prisma";

const GET_CINEMAS = gql`
  query {
    getAllCinemas {
      id
      name
      location
      halls {
        id
        hall_name
        capacity
      }
    }
  }
`;
const ADD_HALL = gql`
  mutation Mutation($hallName: String!, $capacity: Int!, $cinemaId: String!) {
    addHall(hall_name: $hallName, capacity: $capacity, cinemaId: $cinemaId) {
      hall_name
      id
      cinemaId
      capacity
    }
  }
`;
export default function AddHallForm({ onAdded }: { onAdded?: () => void }) {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [cinemaId, setCinemaId] = useState("");
  const [hallName, setHallName] = useState("");
  const [capacity, setCapacity] = useState(0);

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
    const addData = await gqlClient.request(ADD_HALL, {
      hallName,
      cinemaId,
      capacity,
    });

    setHallName("");
    setCapacity(0);
    setCinemaId("");
    onAdded?.();
  };
  console.log("cinemasafsdajfkhskdja", cinemas);
  return (
    <form onSubmit={handleSubmit} className="space-y-2">
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
      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
        Add Hall
      </button>
    </form>
  );
}
