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
};
