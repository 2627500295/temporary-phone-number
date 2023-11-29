import type { PropsWithChildren } from "react";
import { Metadata } from "next";

import { Document, WebVitals, RootProviders } from "@website/components/";

import "@website/styles/globals.css";
import "@website/styles/tailwind.css";

export const metadata: Metadata = {
  title: "Temporary phone number",
  description: "Temporary phone number",
};

function RootLayout({ children }: PropsWithChildren) {
  return (
    <Document>
      <WebVitals />
      <RootProviders>{children}</RootProviders>
    </Document>
  );
}

export default RootLayout;
