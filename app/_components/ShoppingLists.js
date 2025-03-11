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
      <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-600">
        {title}
      </h2>
      <hr className="w-32 h-[2px] mt-1 mb-2 mx-auto bg-primary_rose-200 border-0 rounded-md"></hr>
      <div
        className={`text-start flex flex-col gap-3 ${
          !shared ? "px-10" : "px-3"
        }`}
      >
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
