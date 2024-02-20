import fetch, { FetchOptions } from "@website/fetch";
import { PaginationVO } from "@website/types";

export function getPhoneNumber(phoneNumber: string, options?: FetchOptions) {
  return fetch(`/api/numbers/${phoneNumber}`, options);
}

export interface PhoneNumberVO {
  receivedAt: null | string;
  smsCount: number;
  id: number;
  createdAt: string;
  phoneNumber: string;
  countryCode: number;
  operator: number;
  description: number;
  reportedAt: string | null;
}

export function listPhoneNumber(
  params: { isOnline: boolean },
  options?: FetchOptions,
): Promise<PaginationVO<PhoneNumberVO>> {
  return fetch("/api/numbers", { ...options, params });
}
