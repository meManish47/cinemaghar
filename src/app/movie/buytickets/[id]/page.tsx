
import prismaClient from "@/services/prisma";
import { notFound } from "next/navigation";

export default async function BookTicketsPage({ params }: { params: { id: string } }) {
  const movie = await prismaClient.movie.findUnique({
    where: { id: params.id },
    include: {
      shows: {
        include: {
          hall: {
            include: { cinema: true },
          },
        },
      },
    },
  });

  if (!movie) return notFound();

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">{movie.movie_title} – Book Tickets</h1>

      <div className="space-y-6">
        {movie.shows.map((show) => (
          <div key={show.id} className="border-b pb-4 flex justify-between items-center">
            {/* Cinema & Hall Info */}
            <div>
              <h2 className="text-lg font-semibold">{show.hall.cinema.name}</h2>
              <p className="text-sm text-gray-500">{show.hall.cinema.location}</p>
              <p className="text-sm text-gray-700">Hall: {show.hall.hall_name}</p>
            </div>

            {/* Show Time */}
            <button
              className="px-4 py-2 rounded-md border text-sm font-medium transition 
                hover:bg-red-600 hover:text-white hover:border-red-600"
            >
              {new Date(show.start).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
