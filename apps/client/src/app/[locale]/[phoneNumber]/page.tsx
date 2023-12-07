import { PropsWithParams } from "@website/types";
import { isPhoneNumber } from "class-validator";
import { parsePhoneNumber } from "libphonenumber-js/max";
import { notFound } from "next/navigation";
import { FormatPhoneNumber } from "./components/FormatPhoneNumber";

async function tfetch(path: string, init?: RequestInit) {
  const baseURL = "https://tpn.beautifulpicture.cn";
  const fullUrl = `${baseURL}${path}`;
  const response = await fetch(fullUrl, init);
  return response.json();
}

async function performChecks(phoneNumber: string) {
  await tfetch(`/api/numbers/${phoneNumber}`);
}

async function ReceiveSMS({
  params: { phoneNumber },
}: PropsWithParams<{ phoneNumber: string }>) {
  const intlPhoneNumber = `+${phoneNumber}`;
  if (!isPhoneNumber(intlPhoneNumber)) notFound();
  await performChecks(phoneNumber);

  const parsed = parsePhoneNumber(intlPhoneNumber);

  return (
    <div>
      <div>
        <FormatPhoneNumber phoneNumber={intlPhoneNumber} />
        <div>(Click on number to copy)</div>
      </div>
    </div>
  );
}

export default ReceiveSMS;
