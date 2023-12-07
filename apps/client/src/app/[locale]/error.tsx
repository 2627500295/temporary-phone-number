"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { PropsWithLocaleParams } from "@website/types";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

function Error({ error, reset }: ErrorProps) {
  const t = useTranslations("Error");

  useEffect(() => {
    // TODO: Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>{t("SomethingWentWrong!")}</h2>
      <button onClick={reset}>{t("TryAgain")}</button>
    </div>
  );
}

export default Error;
