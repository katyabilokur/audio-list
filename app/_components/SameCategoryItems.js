"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

function SameCategoryItems({ categoryDetails, onClickHandle, showExtraItems }) {
  return (
    <div className="my-2 sm:my-5">
      <p>
        There are items in your to do shopping list from other{" "}
        {categoryDetails.name} lists.
      </p>
      <button
        onClick={onClickHandle}
        className="text-primary_tur-600 hover:text-zinc-500 font-medium flex gap-2 items-center"
      >
        <span> {!showExtraItems ? "Show all items" : "Hide extra items"}</span>
        {!showExtraItems ? (
          <ChevronDownIcon className="w-5 h-5" />
        ) : (
          <ChevronUpIcon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}

export default SameCategoryItems;
