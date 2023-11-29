import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { inter } from "@website/fonts";
import { WebVitals } from "@website/components";
import {
  APP_NAME,
  APP_VERSION,
  BUILD_DATE,
  COMMIT_ID,
} from "@website/constants";
import type { PropsWithLocaleParams } from "@website/types";
import { RootProviders } from "@website/components/RootProviders";

export const metadata: Metadata = {
  title: "Temporary phone number",
  description: "Temporary phone number",
};

function LocaleLayout({
  children,
  params: { locale },
}: PropsWithChildren<PropsWithLocaleParams>) {
  return (
    <html
      lang={locale}
      data-app-name={APP_NAME}
      data-app-version={APP_VERSION}
      data-build-date={BUILD_DATE}
      data-commit-id={COMMIT_ID}
    >
      <body className={inter.className}>
        <WebVitals />
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}

export default LocaleLayout;
