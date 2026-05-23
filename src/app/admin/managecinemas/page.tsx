"use client";
import { GET_CINEMAS } from "@/app/queries";
import AddCinemaForm from "@/components/admin/addcinema";
import { gqlClient } from "@/services/gql";
import { useEffect, useState } from "react";
import { Cinema } from "../../../../generated/prisma";

export default function CinemasPage() {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);

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
    <div className="h-screen w-full sm:flex gap-8 sm:px-8">
      <div>
        <h1 className="text-2xl font-bold mb-4 ">Cinemas</h1>
        <div className="w-full flex justify-start ">
          <AddCinemaForm onAdded={load} />
        </div>
      </div>
      <ul className="mt-6 space-y-2 w-max h-120  overflow-y-auto">
        <span className="text-lg font-semibold mb-2">Cinemas:</span>
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
