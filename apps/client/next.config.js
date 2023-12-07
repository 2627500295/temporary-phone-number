const withNextIntl = require("next-intl/plugin")("./src/i18n/config.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  env: {
    APP_VERSION: process.env.APP_VERSION ?? "1.0.0-build.0000",
    APP_NAME: process.env.APP_NAME ?? "@tpn/client",
    BUILD_DATE: process.env.BUILD_DATE ?? "",
    COMMIT_ID: process.env.COMMIT_ID ?? "",
    COMMIT_ID_SHORTER: process.env.COMMIT_ID_SHORTER ?? "",
  },
  experimental: {
    turbo: {
      resolveAlias: {
        "next-intl/config": "./src/i18n/config.ts",
      },
    },
  },
};

console.log(JSON.stringify(withNextIntl(nextConfig)));

module.exports = nextConfig;
