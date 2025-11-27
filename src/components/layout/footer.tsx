import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPinterestP,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#2B2B2D] text-gray-400 py-10">
      {/* Logo with lines */}
      <div className="flex items-center justify-center gap-4 mb-6">
        {/* <div className="h-px bg-gray-500 w-14/19"></div> */}

        {/* <Image
          src="/showLogo.png"
          alt="Logo"
          className="h-24 w-1/19 object-contain"
          height={100}
          width={100}
        /> */}

        <div className="h-px bg-gray-500 w-full mb-8"></div>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-3 mb-6">
        {[
          //   { icon: <FaFacebookF />, link: "https://facebook.com" },
          //   { icon: <FaTwitter />, link: "https://twitter.com" },
          {
            icon: <FaInstagram />,
            link: "https://instagram.com/manish_kumar3045",
          },
          //   { icon: <FaYoutube />, link: "https://youtube.com" },
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

      {/* Copyright */}
      <div className="text-xs text-center space-y-2 leading-relaxed max-w-4xl mx-auto px-4">
        <p>
          Copyright {new Date().getFullYear()} © ShowTime Entertainment Pvt.
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
