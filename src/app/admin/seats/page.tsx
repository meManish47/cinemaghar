"use client";
import { useState, useEffect } from "react";
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
const ADD_BULK_SEATS = gql`
  mutation AddBulkSeats($hallId: String!, $seats: [SeatInput!]!) {
    addBulkSeats(hallId: $hallId, seats: $seats) {
      id
      row_no
      seat_no
      hallId
    }
  }
`;
export type HallsWithCinema = Hall & {
  cinema: Cinema;
};

export default function BulkAddSeatsForm({
  onAdded,
}: {
  onAdded?: () => void;
}) {
  const [halls, setHalls] = useState<HallsWithCinema[]>([]);
  const [hallId, setHallId] = useState("");
  const [rows, setRows] = useState<number>(10);
  const [seatsPerRow, setSeatsPerRow] = useState<number>(20);
  const [loading, setLoading] = useState(false);

  // Fetch halls using GraphQL
  const loadHalls = async () => {
    try {
      const data: { getAllHalls: HallsWithCinema[] } = await gqlClient.request(
        GET_HALLS
      );
      setHalls(data.getAllHalls);
    } catch (err) {
      console.error("Failed to fetch halls:", err);
    }
  };

  useEffect(() => {
    loadHalls();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hallId || rows <= 0 || seatsPerRow <= 0) return;

    setLoading(true);

    const seats = [];
    for (let row = 1; row <= rows; row++) {
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        seats.push({ hallId, row_no: row, seat_no: seat });
      }
    }

    try {
      await gqlClient.request(ADD_BULK_SEATS, {
        hallId,
        seats,
      });

      setHallId("");
      setRows(10);
      setSeatsPerRow(20);
      onAdded?.();
    } catch (err) {
      console.error("Failed to add seats:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white shadow-md rounded-xl p-6 border border-gray-200 max-w-md"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Bulk Add Seats
      </h2>

      {/* Hall Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Select Hall
        </label>
        <select
          value={hallId}
          onChange={(e) => setHallId(e.target.value)}
          className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2"
        >
          <option value="">-- Choose a Hall --</option>
          {halls.map((h) => (
            <option key={h.id} value={h.id}>
              {h.hall_name} ({h.cinema.name}) ({h.capacity})
            </option>
          ))}
        </select>
      </div>

      {/* Rows */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Number of Rows
        </label>
        <input
          type="number"
          min="1"
          className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2"
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
        />
      </div>

      {/* Seats per Row */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Seats per Row
        </label>
        <input
          type="number"
          min="1"
          className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2"
          value={seatsPerRow}
          onChange={(e) => setSeatsPerRow(Number(e.target.value))}
        />
      </div>

      {/* Preview */}
      <p className="text-sm text-gray-500">
        Total Seats to Add: <b>{rows * seatsPerRow}</b>
      </p>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition disabled:opacity-50"
      >
        {loading ? "Adding..." : "➕ Add All Seats"}
      </button>
    </form>
  );
}
