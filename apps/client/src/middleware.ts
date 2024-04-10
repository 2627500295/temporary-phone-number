import createMiddleware from "next-intl/middleware";
import { useNextMiddleware } from "./middlewares/useNextMiddleware";
import {
  NextFetchEvent,
  type NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

// export const config = {
//   matcher: ["/((?!api|_next|.*\\..*).*)"], // Skip all paths that should not be internationalized
// };

const intlMiddleware = createMiddleware({
  locales: ["en", "zh-CN"], // A list of all locales that are supported
  defaultLocale: "zh-CN", // Used when no locale matches
  localePrefix: "as-needed", // Don't use a locale prefix for the default locale
});

function setHeadersMiddleware(headers: Record<string, any>) {
  return function receiver(...middlewares: NextMiddleware[]) {
    return function executor(request: NextRequest, event: NextFetchEvent) {
      const res = useNextMiddleware(...middlewares)(request, event);
      const isResponse = res instanceof NextResponse || res instanceof Response;
      const response = isResponse ? res : NextResponse.next();

      Object.entries(headers).forEach(([name, value]) => {
        response.headers.set(name, value);
      });

      return response;
    };
  };
}

function useIntlMiddleware(middleware: NextMiddleware) {
  return function executor(request: NextRequest, event: NextFetchEvent) {
    if (/\/((?!api|_next|.*\..*).*)/.test(request.nextUrl.pathname)) {
      return middleware(request, event);
    }
  };
}

// 服务树——灵活强大的运维资源管理体系 https://blog.csdn.net/KingJin_CSDN_/article/details/107050261
// 组 Group / 工程 Project / 应用 Application
// 公司 Company / 事业群 Business Group / 部门 Department / 服务 Service / 模块 Module
export default setHeadersMiddleware({
  "X-COMPANY": "Dida",
  "X-DEPARTMENT": "R&D",
  "X-GROUP": "Basic service",
  "X-PROJECT": "TPN",
  "X-APPLICATION": "WEBSITE",
})(useIntlMiddleware(intlMiddleware));
