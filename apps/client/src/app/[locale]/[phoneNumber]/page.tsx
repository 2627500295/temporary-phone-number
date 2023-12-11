import { notFound } from "next/navigation";

import { isPhoneNumber } from "class-validator";
import { parsePhoneNumber } from "libphonenumber-js/max";

import { PropsWithParams } from "@website/types";
import { getPhoneNumber, listMessagesByPhoneNumber } from "@website/services";

import { FormatPhoneNumber } from "./components/FormatPhoneNumber";

async function performChecks(phoneNumber: string) {
  const info = await getPhoneNumber(phoneNumber);
  console.log(info);
}

async function ReceiveSMS({
  params: { phoneNumber },
}: PropsWithParams<{ phoneNumber: string }>) {
  const intlPhoneNumber = `+${phoneNumber}`;
  if (!isPhoneNumber(intlPhoneNumber)) notFound();
  await performChecks(phoneNumber);

  const parsed = parsePhoneNumber(intlPhoneNumber);

  const list = await listMessagesByPhoneNumber(phoneNumber);

  console.log("111", list);

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
