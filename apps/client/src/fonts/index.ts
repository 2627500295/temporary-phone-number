import {
  Inter,
  Fira_Code,
  Source_Code_Pro,
  Noto_Sans_SC,
  Ubuntu_Mono,
  DM_Mono,
  JetBrains_Mono,
} from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
});

export const firaCode = Fira_Code({
  subsets: ["latin"],
});

export const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
});

export const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
});

export const ubuntuMono = Ubuntu_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

export const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
});
