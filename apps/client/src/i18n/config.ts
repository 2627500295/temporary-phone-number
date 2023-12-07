import { getRequestConfig } from "next-intl/server";

const config = getRequestConfig(async ({ locale }) => {
  const messages = await import(`../messages/${locale}.json`).then(
    (m) => m.default,
  );

  console.log(
    "getRequestConfig",
    locale,
    messages,
    `../messages/${locale}.json`,
  );

  return { messages };
});

export default config;
