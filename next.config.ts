import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  serverExternalPackages: ["subset-font"],
  images: {
    remotePatterns: [
      {
        hostname: "storage.googleapis.com",
        protocol: "https",
      },
    ],
  },
}

export default nextConfig
