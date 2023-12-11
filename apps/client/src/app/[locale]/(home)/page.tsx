import { getTranslations } from "next-intl/server";
import { PropsWithLocaleParams } from "@website/types";
import { listPhoneNumber } from "@website/services";
import Link from "next/link";

async function Home({ params: { locale } }: PropsWithLocaleParams) {
  const t = await getTranslations({ locale, namespace: "Index" });
  const list = (await listPhoneNumber({ isOnline: true })).list;

  return (
    <div>
      <hgroup>
        <h1>{t("TemporaryPhoneNumber")}</h1>

        {list.map((item) => (
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
