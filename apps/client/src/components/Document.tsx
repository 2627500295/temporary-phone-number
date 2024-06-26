import { PropsWithChildren } from "react";

import { LocaleParams } from "@website/types";
import { notoSansSC } from "@website/fonts";

import {
  APP_NAME,
  APP_VERSION,
  BUILD_DATE,
  COMMIT_ID,
  NODE_ENV,
} from "@website/constants";
import { clsx } from "clsx";

export function Document({
  children,
  locale = "zh-CN",
}: PropsWithChildren<LocaleParams>) {
  return (
    <html
      lang={locale}
      data-app-name={APP_NAME}
      data-app-version={APP_VERSION}
      data-build-date={BUILD_DATE}
      data-commit-id={COMMIT_ID}
      data-app-env={NODE_ENV}
    >
      <body className={clsx(notoSansSC.className)}>{children}</body>
    </html>
  );
}
