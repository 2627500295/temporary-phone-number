// const { resolve } = require("path");
//
// function withNextIntl(nextConfig, i18nPath = "./src/i18n/config.ts") {
//   const isUseTurbo = process.env.TURBOPACK != null;
//
//   if (isUseTurbo) {
//     nextConfig.experimental ||= {};
//     nextConfig.experimental.turbo ||= {};
//     nextConfig.experimental.turbo.resolveAlias ||= {};
//     nextConfig.experimental.turbo.resolveAlias["next-intl/config"] ||= i18nPath;
//   } else {
//     function webpack(config, context) {
//       // Webpack requires absolute paths
//       const i18nAbsolutePath = resolve(config.context, i18nPath);
//       config.resolve.alias["next-intl/config"] = i18nAbsolutePath;
//       if (typeof nextConfig?.webpack !== "function") return config;
//       return nextConfig.webpack(config, context);
//     }
//     nextConfig.webpack = webpack;
//   }
//
//   return nextConfig;
// }

function withNextIntl(nextConfig, i18nPath = "./src/i18n/config.ts") {
  require("next-intl/plugin")(i18nPath)(nextConfig);
}

module.exports = withNextIntl;
