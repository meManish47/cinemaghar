import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: process.env.NODE_ENV === "development" ? {} : undefined,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all hosts
      },
    ],
  },
};

export default nextConfig;
