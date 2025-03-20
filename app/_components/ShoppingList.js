"use client";
import { useEffect, useState } from "react";
import AnimatedLists from "./AnimatedLists";
import SameCategoryItems from "./SameCategoryItems";
import { capitalizeString } from "../_lib/dataHelpers";

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

  let sharerName = "";
  sharerName = categorySharedNames?.get(categoryId);

  return (
    <div className="xs:w-full w-96 sm:w-160 md:w-[900px] mx-auto sm:px-4">
      {extraItems.length > 0 && (
        <SameCategoryItems
          showExtraItems={showExtraItems}
          onClickHandle={handleDisplayExtraItems}
          categoryDetails={categoryDetails}
        />
      )}
      <div className="max-w-6xl mx-auto mt-4 sm:mt-8 p-4 sm:p-6">
        <h2 className="mb-4 sm:mb-6">
          Start shopping for{" "}
          <span className="font-medium">
            {capitalizeString(categoryDetails.name)}
          </span>
          {` ${sharerName ? `shared with you by ${sharerName}` : ""}`}
        </h2>
        <AnimatedLists
          extraItems={extraItems}
          categoryItems={itemsToShow}
          alreadyInCartIds={inCartItemsIds}
        />
      </div>
    </div>
  );
}

export default ShoppingList;
