"use client";

import BackButton from "./BackButton";
import ItemRowView from "./ItemRowView";
import { useState } from "react";
import SameCategoryItems from "./SameCategoryItems";
import PaperElement from "./visual/PaperElement";
import { capitalizeString } from "../_lib/dataHelpers";
import * as IconSet from "hugeicons-react";
import BottomItemsNavigationShared from "./BottomItemsNavigationShared";

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
  const HugeIcon = IconSet[categoryDetails.icon];

  return (
    <div className="xs:w-[360px] w-96 sm:w-160 mx-auto mt-8 px-4">
      {sameCategoryItems.length > 0 && (
        <SameCategoryItems
          showExtraItems={showExtraItems}
          onClickHandle={handleDisplayExtraItems}
          categoryDetails={categoryDetails}
        />
      )}
      <PaperElement>
        <div className="flex gap-4 mx-auto items-end">
          <HugeIcon className="w-8 h-8 text-primary_tur-500" />
          <h2 className="text-lg sm:text-xl font-medium text-zinc-600">
            {capitalizeString(categoryDetails.name)}
          </h2>
        </div>
        <p className="text-center mx-4 sm:mx-8 mb-3 mt-2 italic text-sm sm:text-base text-zinc-500">
          {showExtraItems
            ? `All accessible to you items`
            : `Items shared with you by ${categorySharedNames.get(categoryId)}`}
        </p>

        <hr className="w-full h-[1.5px] mt-2 mb-[6px] bg-primary_rose-600 border-0"></hr>
        <hr className="w-full h-[1.5px] bg-primary_rose-600 border-0 mb-4"></hr>

        <div>
          {itemsToShow.map((itemRow, index) => (
            <div key={`${itemRow.name}-${itemRow.id}`}>
              <ItemRowView item={itemRow} />
              {index < itemsToShow.length - 1 && (
                <hr className="w-full border-t border-primary_blue-300 my-2" />
              )}
            </div>
          ))}
        </div>
      </PaperElement>
      <BackButton className="mt-6 mx-auto mb-20" redirectPath={"/home"}>
        Return Back
      </BackButton>
      <BottomItemsNavigationShared
        categoryId={categoryId}
        showExtraItems={showExtraItems}
      />
    </div>
  );
}

export default SharedItems;
