import createMiddleware from "next-intl/middleware";

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

const middleware = createMiddleware({
  locales: ["en", "zh-CN"],
  defaultLocale: "zh-CN",
});

export default middleware;
