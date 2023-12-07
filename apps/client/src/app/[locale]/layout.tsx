import type { PropsWithChildren } from "react";
import { Document, RootProviders, WebVitals } from "@website/components";
import { PropsWithLocaleParams } from "@website/types";

function LocaleRootLayout({
  children,
  params: { locale },
}: PropsWithChildren<PropsWithLocaleParams>) {
  return (
    <Document locale={locale}>
      <WebVitals />
      {/*<RootProviders>{children}</RootProviders>*/}
      {children}
    </Document>
  );
}

export default LocaleRootLayout;
