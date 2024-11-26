import Link from "next/link";

function ShoppingListsItem({ category, items }) {
  const curItems = items.filter((el) => el.categoryId === category.id);

  return (
    <div>
      <Link href={`/lists/${category.name}`}>
        {category.name} {curItems.length} items
      </Link>
      {/* <ul>
        {curItems.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default ShoppingListsItem;
