"use client";
import { useEffect, useState } from "react";
import AddHallForm from "@/components/admin/addhall";
import { gql } from "graphql-request";
import { gqlClient } from "@/services/gql";
import { Cinema, Hall } from "../../../../generated/prisma";
const GET_HALLS = gql`
  query {
    getAllHalls {
      id
      hall_name
      capacity
      cinema {
        id
        name
        location
      }
      cinemaId
    }
  }
`;
export type HallsWithCinema = Hall & {
  cinema: Cinema;
};
export default function HallsPage() {
  const [halls, setHalls] = useState<HallsWithCinema[]>([]);
  const [loading, setLoading] = useState(false);
  const load = async () => {
    setLoading(true);
    const data: { getAllHalls: HallsWithCinema[] } = await gqlClient.request(
      GET_HALLS
    );
    setHalls( data.getAllHalls);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Page Heading */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">🎭 Manage Halls</h1>
      </div>

      {/* Add Hall Form */}
      <div className="mb-10">
        <AddHallForm onAdded={load} />
      </div>

      {/* Halls List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <span className="loading loading-spinner loading-xl"></span>
        ) : halls.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">
            No halls available. Add one above 👆
          </p>
        ) : (
          halls.map((h) => (
            <div
              key={h.id}
              className="bg-white shadow-md border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {h.hall_name}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                Capacity: <span className="font-medium">{h.capacity}</span>
              </p>
              <p className="text-gray-500 text-sm">
                Cinema:{" "}
                <span className="font-medium text-gray-700">
                  {h.cinema.name}
                </span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
