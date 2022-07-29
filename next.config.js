/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    console.log(config.resolve.fallback);

    return config;
  },
};

module.exports = nextConfig;
