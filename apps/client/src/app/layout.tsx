import type { PropsWithChildren } from "react";

import "@website/styles/globals.css";
import "@website/styles/tailwind.css";

function RootLayout({ children }: PropsWithChildren) {
  return children;
}

export default RootLayout;
