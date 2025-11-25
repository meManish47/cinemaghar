import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: process.env.NODE_ENV === "development" ? {} : undefined,
  },

  // ✅ ESLint warnings suppressed during `npm run build`
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
