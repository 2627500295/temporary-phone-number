import { identical } from "ramda";

async function tfetch(path: string, init?: RequestInit) {
  const baseURL = "https://tpn.beautifulpicture.cn";
  const fullUrl = `${baseURL}${path}`;
  const response = await fetch(fullUrl, init);
  return response.json();
}

export interface FetchOptions<B = any, P = any>
  extends Omit<RequestInit, "body"> {
  baseURL?: string;
  data?: B;
  params?: P;
  interceptor?: (...params: any[]) => any;
}

function buildURL(
  url: string,
  params: Record<string, any> = {},
  serializer: (p: Record<string, any>) => string,
) {
  if (!params) return url;
  return `${url}?${serializer(params)}`;
}

function createFetch(options?: FetchOptions) {
  async function request(path: string, init?: FetchOptions) {
    const opts = { ...options, ...init };

    const baseURL = init?.baseURL ?? options?.baseURL;
    const fullURL = `${baseURL}${path}`;

    const method = init?.method ?? "GET";

    const url = buildURL(fullURL, opts.params, (params) =>
      new URLSearchParams(params).toString(),
    );

    const response = await fetch(url, {
      ...opts,
      body: JSON.stringify(opts.data),
      method,
    });

    const interceptor = opts.interceptor ?? identical;

    return interceptor(response);
  }

  return request;
}

export default createFetch({
  baseURL: "https://tpn.beautifulpicture.cn",
  interceptor(response: any) {
    return response.json();
  },
});
