import createMiddleware from "next-intl/middleware";
import { useNextMiddleware } from "./middlewares/useNextMiddleware";

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // Skip all paths that should not be internationalized
};

const intlMiddleware = createMiddleware({
  locales: ["en", "zh-CN"], // A list of all locales that are supported
  defaultLocale: "zh-CN", // Used when no locale matches
  localePrefix: "as-needed", // Don't use a locale prefix for the default locale
});

export default useNextMiddleware(intlMiddleware);
