"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.includes("/seatselection")) return null;

  return (
    <footer className="bg-[#2B2B2D] text-gray-400 py-4 pb-10">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className=" w-screen flex  items-center">
          <div className="bg-gray-500 h-px w-14/19"></div>
          <div className="w-58 mx-2 relative">
            <Image
              src={"/cinemaghar_white.png"}
              alt="Image"
              width={1200}
              height={13}
            />
          </div>
          <div className="bg-gray-500 h-px w-14/19"></div>
        </div>
      </div>

      <div className="flex justify-center gap-3 mb-6">
        {[
          {
            icon: <FaInstagram />,
            link: "https://instagram.com/manish_kumar3045",
          },
          { icon: <FaGithub />, link: "https://github.com/meManish47" },
          {
            icon: <FaLinkedinIn />,
            link: "https://www.linkedin.com/in/kmanish5710/",
          },
        ].map((item, i) => (
          <a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#3A3A3D] rounded-full w-10 h-10 flex items-center justify-center 
                       hover:bg-gray-600 transition text-lg"
          >
            {item.icon}
          </a>
        ))}
      </div>

      <div className="text-xs text-center space-y-2 leading-relaxed max-w-4xl mx-auto px-4">
        <p>
          Copyright {new Date().getFullYear()} © Cinema Ghar Entertainment Pvt.
          Ltd. All Rights Reserved.
        </p>
        <p>
          The content and images used on this site are copyright protected and
          copyrights vests with the respective owners. The usage of the content
          and images on this website is intended to promote the works and no
          endorsement of the artist shall be implied. Unauthorized use is
          prohibited and punishable by law.
        </p>
      </div>
    </footer>
  );
}
