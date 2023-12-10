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
}

function createFetch(options?: FetchOptions) {
  return function request(path: string, init?: FetchOptions) {
    const baseURL = init?.baseURL ?? options?.baseURL;
    const fullURL = `${baseURL}${path}`;

    const method = init?.method ?? "GET";

    return fetch(fullURL, {
      ...options,
      ...init,
      method,
    });
  };
}

export default createFetch({ baseURL: "https://tpn.beautifulpicture.cn" });
