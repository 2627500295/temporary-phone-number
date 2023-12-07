import { getTranslations } from "next-intl/server";
import { PropsWithLocaleParams } from "@website/types";

async function Home({ params: { locale } }: PropsWithLocaleParams) {
  const t = await getTranslations({ locale, namespace: "Index" });

  return (
    <div>
      <hgroup>
        <h1>Temporary phone number</h1>
        <h2>临时手机号码</h2>
      </hgroup>

      {t("title")}
    </div>
  );
}

export default Home;
