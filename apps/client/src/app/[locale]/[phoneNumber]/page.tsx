import { notFound } from "next/navigation";

import { isPhoneNumber } from "class-validator";
import { parsePhoneNumber } from "libphonenumber-js/max";

import { PropsWithParams } from "@website/types";
import { getPhoneNumber } from "@website/services";

import { FormatPhoneNumber } from "./components/FormatPhoneNumber";

async function performChecks(phoneNumber: string) {
  await getPhoneNumber(phoneNumber);
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
