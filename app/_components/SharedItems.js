"use client";

import Link from "next/link";
import BackButton from "./BackButton";
import ItemRowView from "./ItemRowView";
import { useState } from "react";
import SameCategoryItems from "./SameCategoryItems";

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
        <SameCategoryItems
          showExtraItems={showExtraItems}
          onClickHandle={handleDisplayExtraItems}
          categoryDetails={categoryDetails}
        />
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
      <Link
        href={
          showExtraItems
            ? `/shopping/shared/${categoryId}?show=all`
            : `/shopping/shared/${categoryId}`
        }
      >
        Start shopping
      </Link>
      <BackButton>Back</BackButton>
    </div>
  );
}

export default SharedItems;
