import { parsePhoneNumber } from 'libphonenumber-js/max';

export function getCountryCodeByPhoneNumber(phoneNumber: number | `${number}` | `+${number}`) {
  const number = `${phoneNumber}`.startsWith('+') ? `${phoneNumber}` : `+${phoneNumber}`;
  return parsePhoneNumber(number).country as string;
}
