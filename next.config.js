const withBundleAnalyzer = require("@next/bundle-analyzer")(
  {
    enabled: process.env.ANALYZE === "true",
  }
);

module.exports = withBundleAnalyzer({
  compress: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    domains: ["storage.googleapis.com"],
  },
  staticPageGenerationTimeout: 100000,
});
