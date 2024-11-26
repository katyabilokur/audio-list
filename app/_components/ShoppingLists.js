import ShoppingListsItem from "./ShoppingListsItem";

function ShoppingLists({ categories, items }) {
  console.log(categories);
  return (
    <div>
      {categories.map((cat) => (
        <ShoppingListsItem
          key={cat.name}
          category={cat}
          items={items}
        ></ShoppingListsItem>
      ))}
    </div>
  );
}

export default ShoppingLists;
