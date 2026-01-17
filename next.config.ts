import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Also adding Google for social profile pics
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com", // And Discord
      },
    ],
  },
};

export default nextConfig;
