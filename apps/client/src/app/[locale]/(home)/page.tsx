import { getTranslations } from "next-intl/server";
import { PropsWithLocaleParams } from "@website/types";

async function Home({ params: { locale } }: PropsWithLocaleParams) {
  const t = await getTranslations({ locale, namespace: "Index" });

  return (
    <div>
      <hgroup>
        <h1>{t("TemporaryPhoneNumber")}</h1>
      </hgroup>
    </div>
  );
}

export default Home;
