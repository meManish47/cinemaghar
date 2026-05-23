"use client";

import Panel from "@/components/admin/panel";
import StatCard from "@/components/admin/statcard";
import { gqlClient } from "@/services/gql";
import { useEffect, useState } from "react";
import { GET_COUNTS } from "../queries";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    cinemaCount: 0,
    hallCount: 0,
    userCount: 0,
    todayBookings: 0,
    upcomingShows: 0,
  });

  const [loading, setLoading] = useState(true);

  const loadCounts = async () => {
    try {
      const data: {
        getCounts: {
          userCount: number;
          upcomingShows: number;
          todayBookings: number;
          hallCount: number;
          cinemaCount: number;
        };
      } = await gqlClient.request(GET_COUNTS);
      setCounts({
        ...data.getCounts,
        todayBookings: data.getCounts.todayBookings,
        upcomingShows: data.getCounts.upcomingShows,
      });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCounts();
  }, []);
  console.log("Rendering AdminDashboard with counts:", counts);
  return (
    <main className="min-h-screen w-full  sm:p-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Manage cinemas, halls, users & monitor key metrics.
        </p>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading data...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard title="Total Cinemas" value={counts.cinemaCount} />
          <StatCard title="Total Halls" value={counts.hallCount} />
          <StatCard title="Total Users" value={counts.userCount} />
          <StatCard title="Bookings Today" value={counts.todayBookings} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Panel
          title="Cinema Overview"
          link="/admin/cinemas"
          linkLabel="View Cinemas"
        >
          <ul className="text-sm text-gray-700 leading-relaxed space-y-2">
            <li>🎬 {counts.cinemaCount} cinemas </li>
            <li>🏟️ {counts.hallCount} total halls</li>
            <li>🎟️ Show scheduling available per hall</li>
          </ul>
        </Panel>

        <Panel
          title="Shows & Bookings"
          link="/admin/shows"
          linkLabel="Manage Shows"
        >
          <ul className="text-sm text-gray-700 leading-relaxed space-y-2">
            <li>📅 {counts.upcomingShows} upcoming shows</li>
            <li>🔥 Real-time ticket booking tracking</li>
          </ul>
        </Panel>
      </div>
    </main>
  );
}
