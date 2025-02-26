import Link from "next/link";

function ShoppingListsItem({ category, items, sharedName = null }) {
  const curItems = items.filter((el) => el.categoryId === category.id);

  return (
    <div>
      <Link href={`/items/${category.name}`}>
        <span>
          {category.name} {curItems.length} items
        </span>
        {sharedName && <span>(shared by {sharedName})</span>}
      </Link>
    </div>
  );
}

export default ShoppingListsItem;
