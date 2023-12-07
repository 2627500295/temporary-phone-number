import type { PropsWithChildren } from "react";
import { Document, RootProviders, WebVitals } from "@website/components";
import { PropsWithLocaleParams } from "@website/types";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const defaultLocale: string = "zh-CN";

async function LocaleRootLayout({
  children,
  params: { locale = defaultLocale },
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
