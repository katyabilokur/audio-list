import ShoppingListsItem from "./ShoppingListsItem";

function ShoppingLists({ categories, items }) {
  console.log(categories);
  return (
    <div className="flex gap-4 flex-col">
      <h2>My shopping lists</h2>
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
