import { getTranslations } from "next-intl/server";
import { PropsWithLocaleParams } from "@website/types";

async function NotFound(props: PropsWithLocaleParams) {
  const { params: { locale = "en" } = {} } = props;
  const t = await getTranslations({ locale, namespace: "Error" });
  console.log(">>> NotFound", props);
  return <div>404 | {t("NotFound")}</div>;
}

export default NotFound;
