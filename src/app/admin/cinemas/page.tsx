"use client";

import { GET_CINEMAS } from "@/app/queries";
import { CinemaWithHall } from "@/app/types";
import { gqlClient } from "@/services/gql";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Hall } from "../../../../generated/prisma";

export default function CinemasPage() {
  const [cinemas, setCinemas] = useState<CinemaWithHall[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data: { getAllCinemas: CinemaWithHall[] } = await gqlClient.request(
        GET_CINEMAS
      );

      setCinemas(data.getAllCinemas);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="w-full h-screen sm:px-8 ">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Manage Cinemas
        </h1>

        <Link
          href="/admin/managecinemas"
          className="bg-red-600 text-white text-xs sm:text-sm px-4 py-2 rounded-lg shadow hover:bg-red-700  md:text-base"
        >
          ➕ Add New Cinema
        </Link>
      </div>

      {loading && (
        <p className="text-gray-500 text-center py-10 text-lg">
          Loading cinemas...
        </p>
      )}

      {!loading && cinemas.length === 0 && (
        <p className="text-gray-600 bg-white border shadow p-6 rounded-xl text-center">
          No cinemas found. Click “Add New Cinema” to create one.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cinemas.map((cinema) => (
          <div key={cinema.id} className="bg-white  border  p-6 ">
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              🎦 {cinema.name}
            </h2>

            <p className="text-gray-500 mb-4 text-sm">{cinema.location}</p>

            <div className="flex justify-between text-sm mb-4">
              <span className="font-semibold text-gray-700">
                Halls: {cinema.halls.length}
              </span>

              <span className="font-semibold text-gray-700">
                Capacity:{" "}
                {cinema.halls.reduce(
                  (sum: number, h: Hall) => sum + h.capacity,
                  0
                )}
              </span>
            </div>

            <div className="bg-gray-100 p-3 rounded-lg">
              <h3 className="text-gray-700 font-medium mb-2">Halls:</h3>

              {cinema.halls.length === 0 ? (
                <p className="text-gray-500 text-sm">No halls added yet</p>
              ) : (
                <ul className="space-y-1 text-sm text-gray-600 max-h-32 overflow-y-auto">
                  {cinema.halls.map((hall) => (
                    <li
                      key={hall.id}
                      className="flex justify-between bg-white px-3 py-1 rounded border"
                    >
                      <span>{hall.hall_name}</span>
                      <span className="text-gray-500">
                        {hall.capacity} seats
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* MANAGE BUTTON
            <Link
              className="block mt-4 bg-blue-600 text-white text-center py-2 rounded-lg text-sm hover:bg-blue-700 transition"
              href={`/admin/cinemas/${cinema.id}`}
            >
              Manage Cinema
            </Link> */}
          </div>
        ))}
      </div>
    </div>
  );
}
