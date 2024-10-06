/** @type {import('next').NextConfig} */
module.exports = {
  compress: true,
  images: {
    remotePatterns: [
      {
        hostname: "storage.googleapis.com",
        protocol: "https",
      },
    ],
  },
  staticPageGenerationTimeout: 100000,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), "_http_common"]
    }

    return config
  },
}
