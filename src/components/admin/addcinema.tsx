"use client";

import { gqlClient } from "@/services/gql";
import { gql } from "graphql-request";
import { useState } from "react";

const ADD_CINEMA = gql`
  mutation AddCinema($name: String!, $location: String!) {
    addCinema(name: $name, location: $location) {
      id
      name
      location
    }
  }
`;

export default function AddCinemaForm({ onAdded }: { onAdded?: () => void }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = await gqlClient.request(ADD_CINEMA, { name, location });
    setLoading(false);
    onAdded;
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white py-8 space-y-4 ">
      <h2 className="text-xl font-semibold text-gray-800">🎬 Add New Cinema</h2>

      <input
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Cinema Name"
        required
      />

      <input
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Cinema"}
      </button>
    </form>
  );
}
