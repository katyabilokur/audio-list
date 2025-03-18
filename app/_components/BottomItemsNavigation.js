"use client";

import { useState } from "react";
import { clearCategoryItems } from "../_lib/actions";
import Link from "next/link";
import ClearItemsDialog from "./dialogs/ClearItemsDialog";
import {
  PencilIcon,
  ShoppingCartIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import TooltipInfo from "./TooltipInfo";
import { capitalizeString } from "../_lib/dataHelpers";

function BottomItemsNavigation({
  items,
  categoryName,
  sharedItemsExist,
  showExtraItems,
}) {
  const [isOpenClear, setIsOpenClear] = useState(false);

  async function handleClear() {
    await clearCategoryItems(items);
  }

  return (
    <nav className="h-[72px] fixed bottom-0 left-0 w-full bg-white rounded-t-3xl border-t-2 border-t-primary_purple-600">
      <div className="grid grid-cols-4 px-4">
        <div className="border-r-2 border-primary_purple-600 py-4 flex items-center justify-center">
          <Link
            data-tooltip-id="shopping-tooltip"
            data-tooltip-content="Start Shopping"
            href={`/shopping/${categoryName}${
              showExtraItems ? "?show=all" : ""
            }`}
          >
            <ShoppingCartIcon className="w-10 h-10 text-button-gd hover:text-button-gl" />
          </Link>
          <TooltipInfo id="shopping-tooltip" />
        </div>

        <div className="border-r-2 border-primary_purple-600 flex items-center justify-center">
          <Link
            href={`/items/${categoryName}/shares`}
            data-tooltip-id="share-tooltip"
            data-tooltip-content="Share with other people"
          >
            <UserPlusIcon className="w-10 h-10 text-amber-500 hover:text-amber-400" />
          </Link>
          <TooltipInfo id="share-tooltip" />
        </div>
        <div className="border-r-2 border-primary_purple-600 flex items-center justify-center">
          <Link
            href={`/items/${categoryName}/edit`}
            data-tooltip-id="edit-tooltip"
            data-tooltip-content={`Edit ${capitalizeString(categoryName)} list`}
          >
            <PencilIcon className="w-10 h-10 text-primary_tur-400 hover:text-primary_tur-300" />
          </Link>
          <TooltipInfo id="edit-tooltip" />
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => setIsOpenClear(true)}
            data-tooltip-id="clear-tooltip"
            data-tooltip-content="Clear all items from the list"
          >
            <TrashIcon className="w-10 h-10 text-primary_rose-400 hover:text-primary_rose-300" />
          </button>
          <TooltipInfo id="clear-tooltip" />
        </div>

        <ClearItemsDialog
          sharedItemsExist={sharedItemsExist}
          isOpen={isOpenClear}
          onClose={() => setIsOpenClear(false)}
          onClick={handleClear}
          categoryName={categoryName}
        />
      </div>
    </nav>
  );
}

export default BottomItemsNavigation;
