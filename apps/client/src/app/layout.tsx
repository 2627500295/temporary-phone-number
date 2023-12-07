import type { PropsWithChildren } from "react";
import { Metadata } from "next";

import "@website/styles/globals.css";
import "@website/styles/tailwind.css";
import "@website/styles/dmvendor.css";

export const metadata: Metadata = {
  title: "Temporary phone number",
  description: "Temporary phone number",
};

function RootLayout({ children }: PropsWithChildren) {
  return children;
}

export default RootLayout;
