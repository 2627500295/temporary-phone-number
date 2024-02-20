import type { PropsWithChildren } from "react";
import { Metadata, Viewport } from "next";

import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import { Document, RootProviders, WebVitals } from "@website/components";
import { PropsWithLocaleParams } from "@website/types";
import { DEFAULT_LOCALE } from "@website/constants";

export const metadata: Metadata = {
  title: "Temporary phone number",
};

export const viewport: Viewport = {
  // themeColor: 'black',
  width: "device-width",
  initialScale: 1,
};

async function LocaleRootLayout({
  children,
  params: { locale = DEFAULT_LOCALE },
}: PropsWithChildren<PropsWithLocaleParams>) {
  const messages = await getMessages({ locale });

  return (
    <Document locale={locale}>
      <WebVitals />
      <NextIntlClientProvider messages={messages} locale={locale}>
        <RootProviders>{children}</RootProviders>
      </NextIntlClientProvider>
    </Document>
  );
}

export default LocaleRootLayout;
