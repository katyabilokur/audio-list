"use client";

import BackButton from "./BackButton";
import BottomItemsNavigation from "./BottomItemsNavigation";
import ItemRowView from "./ItemRowView";
import SameCategoryItems from "./SameCategoryItems";
import { useState } from "react";
import PaperElement from "./visual/PaperElement";
import * as IconSet from "hugeicons-react";
import { capitalizeString } from "../_lib/dataHelpers";

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

  const HugeIcon = IconSet[categoryDetails.icon];

  return (
    <>
      <div className="xs:w-[360px] w-96 sm:w-160 mx-auto mt-8 px-4">
        {sameCategoryItems.length > 0 && (
          <SameCategoryItems
            showExtraItems={showExtraItems}
            onClickHandle={handleDisplayExtraItems}
            categoryDetails={categoryDetails}
          />
        )}
        <PaperElement>
          <div className="flex gap-4 mb-2 mx-auto items-end">
            <HugeIcon className="w-8 h-8 text-primary_tur-500" />
            <h2 className="text-lg sm:text-xl font-medium text-zinc-600">
              {capitalizeString(categoryName)}
            </h2>
          </div>

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
        <BackButton className="mt-6 mx-auto mb-24" redirectPath={"/home"}>
          Return Back
        </BackButton>

        <BottomItemsNavigation
          showExtraItems={showExtraItems}
          sharedItemsExist={sameCategoryItems.length > 0}
          items={itemsToShow}
          categoryName={categoryName}
        />
      </div>
    </>
  );
}

export default OwnItems;
