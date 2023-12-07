import { getRequestConfig } from "next-intl/server";

interface GetRequestConfigParams {
  locale: string;
}

async function importDefault(module: any) {
  if (typeof module === "function") {
    return module().then((m: any) => m.default);
  }

  if (typeof module.then === "function") {
    return module.then((m: any) => m.default);
  }

  return module.default;
}

async function createRequestConfig({ locale }: GetRequestConfigParams) {
  const messages = await importDefault(import(`../messages/${locale}.json`));
  return { messages };
}

const config = getRequestConfig(createRequestConfig);

export default config;
