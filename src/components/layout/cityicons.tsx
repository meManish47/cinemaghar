import Image from "next/image";
import type { ReactElement } from "react";

export const cityIcons: Record<string, ReactElement> = {
  Moradabad: (
    <Image
      src="/city-icons/moradabad.svg"
      alt="Kochi"
      height={30}
      width={30}
      className=" "
    />
  ),
  Mumbai: (
    <Image
      src="/city-icons/mumbai.svg"
      alt="Mumbai"
      height={1200}
      width={1200}
      className="w-12 h-12 "
    />
  ),
  "Delhi-NCR": (
    <Image
      src="/city-icons/delhi.svg"
      alt="Delhi"
      height={1200}
      width={1200}
      className="w-12 h-12"
    />
  ),
  Bengaluru: (
    <Image
      src="/city-icons/bengaluru.svg"
      height={1200}
      width={1200}
      alt="Bengaluru"
      className="w-12 h-12"
    />
  ),
  Hyderabad: (
    <Image
      src="/city-icons/hyderabad.svg"
      height={1200}
      width={1200}
      alt="Hyderabad"
      className="w-12 h-12"
    />
  ),
  Chandigarh: (
    <Image
      height={1200}
      width={1200}
      src="/city-icons/chandigarh.svg"
      alt="Chandigarh"
      className="w-12 h-12"
    />
  ),
  Ahmedabad: (
    <Image
      src="/city-icons/ahemdabad.svg"
      height={1200}
      width={1200}
      alt="Ahmedabad"
      className="w-12 h-12"
    />
  ),
  Pune: (
    <Image
      src="/city-icons/new.svg"
      height={1200}
      width={1200}
      alt="Pune"
      className="w-12 h-12"
    />
  ),
  Chennai: (
    <Image
      src="/city-icons/chennai.svg"
      height={1200}
      width={1200}
      alt="Chennai"
      className="w-12 h-12"
    />
  ),
  Kolkata: (
    <Image
      src="/city-icons/kolkata.svg"
      height={1200}
      width={1200}
      alt="Kolkata"
      className="w-12 h-12"
    />
  ),
  Kochi: (
    <Image
      src="/city-icons/kochi.svg"
      height={1200}
      width={1200}
      alt="Kochi"
      className="w-12 h-12"
    />
  ),
};
