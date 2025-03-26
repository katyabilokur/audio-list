"use client";
import Link from "next/link";
import { capitalizeString } from "../_lib/dataHelpers";
import * as IconSet from "hugeicons-react";
import { useTranslations } from "next-intl";

function ShoppingListsItem({ category, items, urlPath, sharerName }) {
  const curItems = items.filter((el) => el.categoryId === category.id);

  const HugeIcon = IconSet[category.icon];

  const t = useTranslations("General");

  return (
    <Link
      href={`/items/${urlPath}`}
      className="text-zinc-600 hover:text-primary_tur-500 flex gap-3 flex-wrap items-end"
    >
      <HugeIcon className="w-6 h-6 text-primary_tur-500 hover:text-primary_tur-400" />
      <p>
        <span className="font-semibold text-base">
          {capitalizeString(category.name)}
        </span>
        {"  "}
        &ndash;{"  "}
        {curItems.length}{" "}
        {curItems.length === 1 ? `${t("item")}` : `${t("items")}`}
      </p>

      {sharerName && (
        <span className="italic text-zinc-400">
          {`${t("by")} ${sharerName}`}
        </span>
      )}
    </Link>
  );
}

export default ShoppingListsItem;
