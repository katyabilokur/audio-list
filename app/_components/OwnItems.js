"use client";

import Link from "next/link";
import BackButton from "./BackButton";
import BottomItemsNavigation from "./BottomItemsNavigation";
import ItemRowView from "./ItemRowView";
import SameCategoryItems from "./SameCategoryItems";
import { useState } from "react";

function OwnItems({ sameCategoryItems, categoryDetails, items, categoryName }) {
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
    <>
      <div className="max-w-6xl mx-auto mt-8">
        {sameCategoryItems.length > 0 && (
          <SameCategoryItems
            showExtraItems={showExtraItems}
            onClickHandle={handleDisplayExtraItems}
            categoryDetails={categoryDetails}
          />
        )}

        <h2>{categoryName}</h2>
        {itemsToShow.map((itemRow) => (
          <ItemRowView item={itemRow} key={`${itemRow.name}-${itemRow.id}`} />
        ))}
        <Link
          href={`/shopping/${categoryName}${showExtraItems ? "?show=all" : ""}`}
        >
          Start shopping
        </Link>
        <BackButton>Back</BackButton>
        <BottomItemsNavigation
          sharedItemsExist={sameCategoryItems.length > 0}
          items={itemsToShow}
          categoryName={categoryName}
        />
      </div>
    </>
  );
}

export default OwnItems;
