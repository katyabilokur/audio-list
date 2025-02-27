import Link from "next/link";

function ShoppingListsItem({ category, items, urlPath, sharerName }) {
  const curItems = items.filter((el) => el.categoryId === category.id);

  //   const sharedByText = "";
  //   if (sharedName.contains("shared")) {
  //  const
  //   }

  return (
    <div>
      <Link href={`/items/${urlPath}`}>
        <span>
          {category.name} {curItems.length} items
        </span>
        {sharerName && <span>(shared by {sharerName})</span>}
      </Link>
    </div>
  );
}

export default ShoppingListsItem;
