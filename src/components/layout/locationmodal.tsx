"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LocateFixed, Search } from "lucide-react";

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

type LocationModalProps = {
  onSelect?: (city: string) => void;
  onClose?: () => void;
};

export default function LocationModal({
  onSelect,
  onClose,
}: LocationModalProps) {
  const [searchText, setSearchText] = useState("");

  const filteredCities = useMemo(() => {
    if (!searchText) return [];
    return POPULAR_CITIES.filter((city) =>
      city.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const handleSelect = (city: string) => {
    localStorage.setItem("user_city", city);
    onSelect?.(city);
    onClose?.();
  };

  const detectLocation = () => {
    navigator.geolocation.getCurrentPosition(
      () => handleSelect("Detected Location"),
      () => alert("Location access denied!")
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-white p-6 rounded-2xl shadow-2xl w-[90%] sm:w-[650px]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Box */}
          <div className="relative mb-4">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search for your city"
              className="border rounded-lg w-full px-10 py-2 outline-none focus:border-red-500 transition"
            />

            {/* Dropdown Filter Suggestions */}
            {filteredCities.length > 0 && (
              <div className="absolute bg-white shadow-lg border rounded-lg mt-1 w-full z-10 max-h-40 overflow-y-auto animate-fadeIn">
                {filteredCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleSelect(city)}
                    className="block w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-500"
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={detectLocation}
            className="flex items-center gap-2 text-red-500 font-medium mb-4 hover:opacity-80"
          >
            <LocateFixed size={18} /> Detect my location
          </button>

          {/* Popular Cities */}
          {!searchText && (
            <>
              <p className="text-center font-semibold mb-4 text-gray-600">
                Popular Cities
              </p>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 text-center text-sm">
                {POPULAR_CITIES.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleSelect(city)}
                    className="text-gray-700 hover:text-red-500"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
