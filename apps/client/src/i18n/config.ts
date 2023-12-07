import { getRequestConfig } from "next-intl/server";

interface GetRequestConfigParams {
  locale: string;
}

async function createRequestConfig({ locale }: GetRequestConfigParams) {
  const messages = await import(`../messages/${locale}.json`);
  return { messages };
}

const config = getRequestConfig(createRequestConfig);

export default config;
