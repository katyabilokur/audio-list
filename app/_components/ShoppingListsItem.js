import Link from "next/link";

function ShoppingListsItem({ category, items }) {
  const curItems = items.filter((el) => el.categoryId === category.id);

  return (
    <div>
      <Link href={`/items/${category.name}`}>
        {category.name} {curItems.length} items
      </Link>
    </div>
  );
}

export default ShoppingListsItem;
