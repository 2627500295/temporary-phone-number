import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "zh-CN"],

  // Used when no locale matches
  defaultLocale: "zh-CN",

  // Don't use a locale prefix for the default locale
  localePrefix: "as-needed",
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
