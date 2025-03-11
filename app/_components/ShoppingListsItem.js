import Link from "next/link";
import { capitalizeString } from "../_lib/dataHelpers";

function ShoppingListsItem({ category, items, urlPath, sharerName }) {
  const curItems = items.filter((el) => el.categoryId === category.id);

  //   const sharedByText = "";
  //   if (sharedName.contains("shared")) {
  //  const
  //   }

  return (
    <Link
      href={`/items/${urlPath}`}
      className="text-zinc-600 hover:text-primary_rose-500 "
    >
      <span className="font-semibold text-lg">
        {capitalizeString(category.name)}
      </span>
      {"  "}
      &ndash;{"  "}
      {curItems.length} {curItems.length === 1 ? "item" : "items"}
      {sharerName && (
        <span className="italic text-zinc-400">
          {"   "}(by {sharerName})
        </span>
      )}
    </Link>
  );
}

export default ShoppingListsItem;
