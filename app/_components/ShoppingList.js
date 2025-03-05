"use client";
import { useEffect, useState } from "react";
import AnimatedLists from "./AnimatedLists";
import SameCategoryItems from "./SameCategoryItems";

function ShoppingList({
  categoryDetails,
  items,
  categorySharedNames,
  categoryId,
  inCartItemsIds,
  showExtraItemsDefault,
  extraItems,
}) {
  const [showExtraItems, setShowExtraItems] = useState(showExtraItemsDefault);
  const [itemsToShow, setItemsToShow] = useState(
    showExtraItemsDefault ? [...items, ...extraItems] : items
  );

  function handleDisplayExtraItems() {
    setShowExtraItems((prev) => {
      const newShowExtraItems = !prev;

      setItemsToShow(newShowExtraItems ? [...items, ...extraItems] : items);

      return newShowExtraItems;
    });
  }
  const sharerName = categorySharedNames.get(categoryId);

  return (
    <>
      {extraItems.length > 0 && (
        <SameCategoryItems
          showExtraItems={showExtraItems}
          onClickHandle={handleDisplayExtraItems}
          categoryDetails={categoryDetails}
        />
      )}
      <div className="max-w-6xl mx-auto mt-8">
        <h2>{`Start shopping for ${categoryDetails.name} ${
          sharerName ? `shared with you by ${sharerName}` : ""
        }`}</h2>
        <AnimatedLists
          extraItems={extraItems}
          categoryItems={itemsToShow}
          alreadyInCartIds={inCartItemsIds}
        />
      </div>
    </>
  );
}

export default ShoppingList;
