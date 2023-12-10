import fetch, { FetchOptions } from "@website/fetch";

export function listMessagesByPhoneNumber(
  phoneNumber: string,
  options?: FetchOptions,
) {
  return fetch(`/api/numbers/${phoneNumber}/sms`, options);
}
