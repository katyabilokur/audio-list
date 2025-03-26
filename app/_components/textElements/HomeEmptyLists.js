"use client";
import { useTranslations } from "next-intl";

export default function HomeEmptyLists() {
  const t = useTranslations("Home");

  return (
    <p className="text-base sm:text-xl text-zinc-500 mb-3">{t("emptyLists")}</p>
  );
}
