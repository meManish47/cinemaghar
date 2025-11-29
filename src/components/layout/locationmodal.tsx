"use client";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import clsx from "clsx";
import { cityIcons } from "./cityicons";

const POPULAR_CITIES = [
  "Moradabad",
  "Mumbai",
  "Delhi-NCR",
  "Bengaluru",
  "Hyderabad",
  "Chandigarh",
  "Ahmedabad",
  "Pune",
  "Chennai",
  "Kolkata",
];

export default function LocationDropdown({
  onSelect,
  className,
}: {
  onSelect: (city: string) => void;
  className?: string;
}) {
  const [searchText, setSearchText] = useState("");

  const filteredCities = useMemo(() => {
    if (!searchText) return [];
    return POPULAR_CITIES.filter((city) =>
      city.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  return (
    <div
      className={clsx(
        "bg-white shadow-xl border-b border-gray-200 py-5 px-8 z-50 rounded-lg ",
        className
      )}
    >
      <div className="relative mb-4 w-full ">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search city"
          className="border rounded-lg w-full px-10 py-2 outline-none focus:border-red-500"
        />
      </div>

      {!searchText && (
        <>
          <p className="text-sm font-semibold text-gray-600 mb-6 text-center">
            Popular Cities
          </p>

          <div className="flex gap-10 justify-center items-end overflow-x-auto hide-scrollbar pb-4">
            {POPULAR_CITIES.map((city) => (
              <button
                key={city}
                onClick={() => onSelect(city)}
                className="flex flex-col items-center gap-2 group "
              >
                <div className="group-hover:scale-110 transition-transform duration-200 ">
                  {cityIcons[city]}
                </div>
                <span className="text-sm text-gray-800 group-hover:text-red-500">
                  {city}
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {searchText && (
        <div className="space-y-2">
          {filteredCities.map((city) => (
            <button
              key={city}
              onClick={() => onSelect(city)}
              className="block w-full text-left px-2 py-2 hover:bg-red-50 rounded-lg hover:text-red-500"
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
