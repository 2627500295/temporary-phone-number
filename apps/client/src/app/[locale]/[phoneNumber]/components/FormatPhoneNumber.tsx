import { parsePhoneNumber } from "libphonenumber-js/max";

export function FormatPhoneNumber({ phoneNumber }: { phoneNumber: string }) {
  const parsed = parsePhoneNumber(phoneNumber);
  const countryCode = `+${parsed.countryCallingCode}`;
  const nationalPhoneNumber = parsed.formatNational();
  const formattedPhoneNumber = `${countryCode} ${nationalPhoneNumber}`;
  return <div>{formattedPhoneNumber}</div>;
}
