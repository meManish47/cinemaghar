"use client";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";

const LocationModal = dynamic(() => import("./locationmodal"), { ssr: false });

export default function LocationSelector() {
  const [city, setCity] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("user_city");
    if (saved) setCity(saved);
    else setOpen(true);
  }, []);

  const updateCity = (newCity: string) => {
    localStorage.setItem("user_city", newCity);
    setCity(newCity);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-red-500"
      >
        <MapPin size={16} />
        {city ? city : "Select Location"}
      </button>

      {open && (
        <LocationModal onSelect={updateCity} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
