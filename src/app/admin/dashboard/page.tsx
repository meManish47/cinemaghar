import prisma from "@/services/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  // ---- Fetch Counts ----
  const [cinemaCount, hallCount, userCount] = await Promise.all([
    prisma.cinema.count(),
    prisma.hall.count(),
    prisma.user.count(),
  ]);

  return (
    <div className="flex min-h-screen">
      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Welcome to Admin Dashboard
        </h1>

        <p className="text-gray-600 mb-8 max-w-xl">
          Use the dashboard to manage cinemas, halls, and users efficiently.
        </p>

        {/* ----- TOP COUNT CARDS ----- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {/* Cinema Count */}
          <div className="bg-white shadow-sm rounded-xl p-5 border">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold text-gray-800"> Cinemas</h2>
              <Link
                className="text-sm  underline text-red-500 cursor-pointer"
                href={"/admin/managecinemas"}
              >
                {"Manage -> "}
              </Link>
            </div>
            <p className="text-3xl font-bold mt-3">{cinemaCount}</p>
          </div>

          {/* Hall Count */}
          <div className="bg-white shadow-sm rounded-xl p-5 border">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold text-gray-800"> Halls</h2>
              <Link
                className="text-sm  underline text-red-500 cursor-pointer"
                href={"/admin/managehalls"}
              >
                {"Manage -> "}
              </Link>
            </div>
            <p className="text-3xl font-bold mt-3">{hallCount}</p>
          </div>

          {/* User Count */}
          <div className="bg-white shadow-sm rounded-xl p-5 border">
            <h2 className="text-lg font-semibold text-gray-800"> Users</h2>
            <p className="text-3xl font-bold mt-3">{userCount}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export function ActionCard({
  title,
  desc,
  href,
}: {
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <div className="bg-white shadow-sm rounded-xl p-5 border hover:shadow-lg transition-all duration-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-sm text-gray-500 mb-4">{desc}</p>
      <Link
        href={href}
        className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
      >
        Manage
      </Link>
    </div>
  );
}
