"use client";

import Link from "next/link";
import BackButton from "./BackButton";
import ItemRowView from "./ItemRowView";
import { useState } from "react";

function SharedItems({
  sameCategoryItems,
  categoryDetails,
  items,
  categorySharedNames,
  categoryId,
}) {
  const [showExtraItems, setShowExtraItems] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(items);

  function handleDisplayExtraItems() {
    setShowExtraItems((prev) => {
      const newShowExtraItems = !prev;

      setItemsToShow(
        newShowExtraItems ? [...items, ...sameCategoryItems] : items
      );

      return newShowExtraItems;
    });
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      {sameCategoryItems.length > 0 && (
        <>
          <p>
            There are items in your shopping cart from other
            {categoryDetails.name} lists.
          </p>
          <button onClick={handleDisplayExtraItems}>
            {!showExtraItems ? "Include all items" : "Hide extra items"}
          </button>
        </>
      )}
      <h2>
        {showExtraItems
          ? `Here are all ${categoryDetails.name} items to by`
          : `Here are the ${
              categoryDetails.name
            } items shared with you by ${categorySharedNames.get(categoryId)}`}
      </h2>
      {itemsToShow.map((itemRow) => (
        <ItemRowView item={itemRow} key={`${itemRow.name}-${itemRow.id}`} />
      ))}
      <Link href={`/shopping/shared/${categoryId}`}>Start shopping</Link>
      <BackButton>Back</BackButton>
    </div>
  );
}

export default SharedItems;
