import { GroupedCinema } from "@/app/types";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default async function ShowShows({ grouped }: { grouped: GroupedCinema[] }) {
  const User = await currentUser();

  return (
    <div className="space-y-6">
      {grouped.map((group) => (
        <div
          key={group.cinema.id}
          className="p-5 bg-white shadow border border-gray-200 flex flex-col gap-4"
        >
          {/* Cinema Name + Location */}
          <div className="w-full">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              {group.cinema.name}
            </h2>
            <p className="text-gray-500 text-xs md:text-sm">
              {group.cinema.location}
            </p>
          </div>

          {/* Scrollable Shows Row */}
          <div className="flex flex-nowrap gap-3 md:gap-4 w-full overflow-x-auto scrollbar-hide pb-2">
            {group.shows.map((show) => {
              const date = new Date(Number(show.date))
                .toISOString()
                .split("T")[0];

              const time = new Date(Number(show.start)).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "UTC",
              });

              const card = (
                <div className="cursor-pointer w-28 h-14 md:w-32 md:h-16 border-2 border-green-500 p-2 shrink-0 flex flex-col items-center justify-center bg-white hover:bg-green-50 shadow-sm transition text-center rounded">
                  <p className="text-[9px] md:text-[10px] text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {date}
                  </p>
                  <p className="font-medium text-gray-700 text-xs md:text-sm">
                    {time}
                  </p>
                  <p className="text-[8px] md:text-[9px] text-gray-500">
                    Dolby Atmos
                  </p>
                </div>
              );

              return User ? (
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
