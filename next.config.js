/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  compress: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["storage.googleapis.com"],
  },
  staticPageGenerationTimeout: 100000,
});
