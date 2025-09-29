"use client";
import { useEffect, useState } from "react";
import AddCinemaForm from "@/components/admin/addcinema";
import { gql } from "graphql-request";
import { gqlClient } from "@/services/gql";
import { Cinema } from "../../../../generated/prisma";

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

export default function CinemasPage() {
  const [cinemas, setCinemas] = useState<any[]>([]);

  const load = async () => {
    const data: { getAllCinemas: Cinema[] } = await gqlClient.request(
      GET_CINEMAS
    );
    setCinemas(await data.getAllCinemas);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cinemas</h1>
      <AddCinemaForm onAdded={load} />
      <ul className="mt-6 space-y-2">
        {cinemas.map((c) => (
          <li key={c.id} className="border p-3 rounded">
            <h2 className="font-semibold">{c.name}</h2>
            <p className="text-sm text-gray-600">{c.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
