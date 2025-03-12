import Link from "next/link";
import { capitalizeString } from "../_lib/dataHelpers";
import { House01Icon } from "hugeicons-react";
import * as IconSet from "hugeicons-react";

function ShoppingListsItem({ category, items, urlPath, sharerName }) {
  const curItems = items.filter((el) => el.categoryId === category.id);

  const HugeIcon = IconSet[category.icon];

  return (
    <Link
      href={`/items/${urlPath}`}
      className="text-zinc-600 hover:text-primary_tur-500 flex gap-3 flex-wrap"
    >
      <HugeIcon className="w-6 h-6 text-primary_tur-500 hover:text-primary_tur-400" />
      <p>
        <span className="font-semibold text-base">
          {capitalizeString(category.name)}
        </span>
        {"  "}
        &ndash;{"  "}
        {curItems.length} {curItems.length === 1 ? "item" : "items"}
      </p>

      {sharerName && (
        <span className="italic text-zinc-400">(by {sharerName})</span>
      )}
    </Link>
  );
}

export default ShoppingListsItem;
