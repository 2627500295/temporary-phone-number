import { PropsWithChildren } from "react";
import { LocaleParams } from "@website/types";
import {
  APP_NAME,
  APP_VERSION,
  BUILD_DATE,
  COMMIT_ID,
} from "@website/constants";
import { inter } from "@website/fonts";

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
    >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
