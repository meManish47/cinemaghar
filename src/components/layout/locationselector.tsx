"use client";
import { useEffect, useState, useRef } from "react";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import LocationDropdown from "./locationmodal";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function LocationSelector() {
  const [city, setCity] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("user_city");
    if (saved) setCity(saved);
  }, []);

  const updateCity = (newCity: string) => {
    localStorage.setItem("user_city", newCity);
    setCity(newCity);
    setOpen(false);
  };

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="flex  items-center gap-1 text-xs  sm:text-sm cursor-pointer font-medium transition text-gray-700 hover:text-red-500"
      >
        <MapPin size={16} />
        <span className="sm:block hidden">{city || "Select Location"}</span>
        <MdKeyboardArrowDown size={16} />
      </button>

      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 bg-black/45  z-40"
            onClick={() => setOpen(false)}
          />

          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.98, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ y: -20, opacity: 0, scale: 0.98, filter: "blur(4px)" }}
            transition={{
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute top-10 right-0 min-w-max w-252 z-50 drop-shadow-xl rounded-4xl"
          >
            <LocationDropdown onSelect={updateCity} />
          </motion.div>
        </>
      )}
    </div>
  );
}
