import type { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function useNextMiddleware(...middlewares: NextMiddleware[]) {
  return function executor(
    request: NextRequest,
    event: NextFetchEvent,
  ): NextResponse | Response | null | undefined | void {
    for (const middleware of middlewares) {
      const response = middleware(request, event);
      if (response instanceof NextResponse) return response;
    }
  };
}
