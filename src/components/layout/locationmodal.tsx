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
        "bg-white shadow-xl border-b border-gray-200 z-50 rounded-lg",
        "px-4 py-4 sm:px-8 sm:py-5", // Mobile compact vertical
        "w-full sm:w-auto", // Mobile full width
        className
      )}
    >
      <div className="relative mb-4 w-full  mx-auto">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search city"
          className="border rounded-lg w-full px-10 py-2 outline-none focus:border-red-500 text-sm"
        />
      </div>

      {!searchText && (
        <>
          <p className="text-sm font-semibold text-gray-600 mb-4 text-center">
            Popular Cities
          </p>

          <div
            className="
              flex flex-wrap sm:flex-nowrap
              gap-6 sm:gap-10
              justify-center items-center
              sm:overflow-x-auto
              sm:pb-4
            "
          >
            {POPULAR_CITIES.map((city) => (
              <button
                key={city}
                onClick={() => onSelect(city)}
                className="flex flex-col items-center gap-2 group cursor-pointer w-20 sm:w-auto"
              >
                <div className="group-hover:scale-110 transition-transform duration-200">
                  {cityIcons[city]}
                </div>
                <span className="text-xs sm:text-sm text-gray-800 group-hover:text-red-500">
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
              className="block w-full text-left px-2 py-2 hover:bg-red-50 rounded-lg hover:text-red-500 text-sm"
            >
              {city}
            </button>
          ))}

          {filteredCities.length === 0 && (
            <p className="text-center text-gray-500 text-sm">
              No results found
            </p>
          )}
        </div>
      )}
    </div>
  );
}
