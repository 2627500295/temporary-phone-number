function withNextIntl(nextConfig, i18nPath) {
  return require("next-intl/plugin")(i18nPath)(nextConfig);
}

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
};

const nextConfigWithNextIntl = withNextIntl(nextConfig, "./src/i18n/config.ts");

module.exports = nextConfigWithNextIntl;
