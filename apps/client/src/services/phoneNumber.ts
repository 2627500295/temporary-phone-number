import fetch, { FetchOptions } from "@website/fetch";

export function getPhoneNumber(phoneNumber: string, options?: FetchOptions) {
  return fetch(`/api/numbers/${phoneNumber}`, options);
}
