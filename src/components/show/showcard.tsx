import Link from "next/link";
import { SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { Calendar, Clock } from "lucide-react";
import { ShowWithHall } from "@/app/movie/buytickets/[id]/page";
import { CinemaWithHall } from "@/app/admin/cinemas/page";

export type GroupedCinema = {
  cinema: CinemaWithHall;
  shows: ShowWithHall[];
};

export default function ShowShows({ grouped }: { grouped: GroupedCinema[] }) {
  const { isSignedIn } = useUser();

  return (
    <div className="space-y-6">
      {grouped.map((group) => (
        <div
          key={group.cinema.id}
          className="p-5 bg-white rounded-lg shadow border border-gray-200 flex flex-col md:flex-row gap-4"
        >
          <div className="w-full md:w-1/3 mb-2 md:mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">{group.cinema.name}</h2>
            <p className="text-gray-500 text-xs md:text-sm">{group.cinema.location}</p>
          </div>

          <div className="flex flex-wrap gap-3 md:gap-4 w-full">
            {group.shows.map((show) => {
              const date = new Date(Number(show.date)).toISOString().split("T")[0];
              const time = new Date(Number(show.start)).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "UTC",
              });

              const card = (
                <div className="cursor-pointer w-28 h-16 md:w-32 md:h-16 border-2 border-green-500 rounded-md p-2 flex flex-col items-center justify-center bg-white hover:bg-green-50 shadow-sm transition text-center">
                  <p className="text-[9px] md:text-[10px] text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {date}
                  </p>
                  <p className="font-semibold text-gray-700 flex items-center gap-1 text-xs md:text-sm">
                    <Clock className="w-4 h-4" /> {time}
                  </p>
                  <p className="text-[8px] md:text-[9px] text-gray-500">Dolby Atmos</p>
                </div>
              );

              return isSignedIn ? (
                <Link key={show.id} href={`/movie/seatselection/${show.id}`}>
                  {card}
                </Link>
              ) : (
                <SignedOut key={show.id}>
                  <SignInButton mode="modal">{card}</SignInButton>
                </SignedOut>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}