import ShoppingListsItem from "./ShoppingListsItem";

function ShoppingLists({
  categories,
  items,
  title,
  shared = false,
  sharedNames = null,
}) {
  return (
    <div className="flex gap-4 flex-col">
      <h2>{title}</h2>
      <div>
        {categories.map((cat) => (
          <ShoppingListsItem
            sharerName={shared ? sharedNames.get(cat.id) : null}
            urlPath={shared ? `shared/${cat.id}` : `${cat.name}`}
            key={`${cat.name}-${cat.id}`}
            category={cat}
            items={items}
          ></ShoppingListsItem>
        ))}
      </div>
    </div>
  );
}

export default ShoppingLists;
