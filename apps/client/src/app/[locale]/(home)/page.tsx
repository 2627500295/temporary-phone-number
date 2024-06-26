import { getTranslations } from "next-intl/server";
import Link from "next/link";

import { PropsWithLocaleParams } from "@website/types";
import { listPhoneNumber } from "@website/services";

async function Home({ params: { locale } }: PropsWithLocaleParams) {
  const t = await getTranslations({ locale, namespace: "Index" });
  const { items } = await listPhoneNumber({ isOnline: true });

  return (
    <div>
      <hgroup>
        <h1>{t("TemporaryPhoneNumber")}</h1>

        {items.map((item) => (
          <Link href={`/${item.phoneNumber}`} key={item.phoneNumber}>
            <div>
              <div>{item.phoneNumber}</div>
              <div>{item.description}</div>
            </div>
          </Link>
        ))}
      </hgroup>
    </div>
  );
}

export default Home;
