import ShoppingListsItem from "./ShoppingListsItem";

function ShoppingLists({ categories, items, title }) {
  return (
    <div className="flex gap-4 flex-col">
      <h2>{title}</h2>
      <div>
        {categories.map((cat) => (
          <ShoppingListsItem
            key={cat.name}
            category={cat}
            items={items}
          ></ShoppingListsItem>
        ))}
      </div>
    </div>
  );
}

export default ShoppingLists;
