const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  env: {
    APP_VERSION: process.env.APP_VERSION,
    APP_NAME: process.env.APP_NAME,
    BUILD_DATE: process.env.BUILD_DATE,
    COMMIT_ID: process.env.COMMIT_ID,
    COMMIT_ID_SHORTER: process.env.COMMIT_ID_SHORTER,
  },
};

module.exports = withNextIntl(nextConfig);
