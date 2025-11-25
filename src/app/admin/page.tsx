"use client";

import { gqlClient } from "@/services/gql";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GET_COUNTS } from "../queries";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [counts, setCounts] = useState<{
    cinemaCount: number;
    hallCount: number;
    userCount: number;
  }>({
    cinemaCount: 0,
    hallCount: 0,
    userCount: 0,
  });

  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const loadCounts = async () => {
    try {
      const data: {
        getCounts: {
          cinemaCount: number;
          hallCount: number;
          userCount: number;
        };
      } = await gqlClient.request(GET_COUNTS);
      setCounts(data.getCounts);
      // console.log(data.getCounts, "sdkjfhskjdhfs");
    } catch (err) {
      console.error("❌ Failed to load counts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCounts();
  }, []);

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Welcome to Admin Dashboard
        </h1>

        <p className="text-gray-600 mb-8 max-w-xl">
          Use the dashboard to manage cinemas, halls, and users efficiently.
        </p>

        {/* ----- TOP COUNT CARDS ----- */}
        {loading ? (
          <p className="text-gray-500">Loading dashboard...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {/* Cinema Count */}
            <DashboardCard
              title="Cinemas"
              count={counts.cinemaCount}
              href="/admin/cinemas"
            />

            {/* Hall Count */}
            <DashboardCard
              title="Halls"
              count={counts.hallCount}
              href="/admin/halls"
            />

            <div className="bg-white shadow-sm rounded-xl p-5 border hover:shadow-lg transition-all duration-200">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold text-gray-800">{`Users`}</h2>
              </div>

              <p className="text-3xl font-bold mt-3">{counts.userCount}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* ------------------ COMPONENTS ------------------ */

function DashboardCard({
  title,
  count,
  href,
}: {
  title: string;
  count: number;
  href: string;
}) {
  return (
    <div
      className="bg-white shadow-sm rounded-xl p-5 border hover:shadow-lg transition-all duration-200"
      onClick={() => {
        window.location.href = href;
      }}
    >
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

        {title != "Users" && (
          <Link
            className="text-sm underline text-red-500 cursor-pointer hover:text-red-700"
            href={href}
          >
            Manage →
          </Link>
        )}
      </div>

      <p className="text-3xl font-bold mt-3">{count}</p>
    </div>
  );
}

// "use client";

// import AdminNavBar from "@/components/admin/adminNavBar";
// import Link from "next/link";

// export default function AdminDashboard() {
//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <main className="flex-1 p-6 ">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
//           Welcome to Admin Dashboard
//         </h1>

//         <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base max-w-2xl">
//           Use the dashboard to manage cinemas, halls, movies, and shows
//           efficiently.
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
//           {/* Manage Cinemas */}
//           <div className="bg-white shadow-sm rounded-xl p-5 border hover:shadow-lg transition-all duration-200">
//             <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
//               🎥 Add a Cinema
//             </h2>
//             <p className="text-sm text-gray-500 mb-4">
//               Create a new cinema with location details.
//             </p>
//             <Link
//               href="/admin/cinemas"
//               className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
//             >
//               Manage Cinemas
//             </Link>
//           </div>

//           {/* Manage Halls */}
//           <div className="bg-white shadow-sm rounded-xl p-5 border hover:shadow-lg transition-all duration-200">
//             <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
//               🏟️ Manage Halls
//             </h2>
//             <p className="text-sm text-gray-500 mb-4">
//               Add halls to cinemas and define capacity.
//             </p>
//             <Link
//               href="/admin/halls"
//               className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
//             >
//               Manage Halls
//             </Link>
//           </div>

//           {/* Manage Shows */}
//           <div className="bg-white shadow-sm rounded-xl p-5 border hover:shadow-lg transition-all duration-200">
//             <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
//               📅 Manage Shows
//             </h2>
//             <p className="text-sm text-gray-500 mb-4">
//               Create and manage shows for movies in specific halls.
//             </p>
//             <Link
//               href="/admin/shows"
//               className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
//             >
//               Manage Shows
//             </Link>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
