"use client";

import AdminNavBar from "@/components/admin/adminNavBar";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col min-h-screen  bg-gray-50">
      <AdminNavBar />
      <main className="flex-1 p-10 px-32">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to Admin Dashboard
        </h1>

        <p className="text-gray-600 mb-8">
          Use the sidebar to manage cinemas, halls, seats, movies, and bookings.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              🎥 Add a Cinema
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Create a new cinema with location details.
            </p>
            <Link
              href="/admin/cinemas"
              className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
            >
              Manage Cinemas
            </Link>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              🏟️ Manage Halls
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Add halls to cinemas and define seating capacity.
            </p>
            <Link
              href="/admin/halls"
              className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
            >
              Manage Halls
            </Link>
          </div>


          <div className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              📅 Manage Shows
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Create and manage shows for movies in specific halls.
            </p>
            <Link
              href="/admin/shows"
              className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
            >
              Manage Shows
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
