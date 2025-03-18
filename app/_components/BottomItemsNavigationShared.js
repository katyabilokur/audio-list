"use client";

import { useState } from "react";
import { clearCategoryItems } from "../_lib/actions";
import Link from "next/link";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import TooltipInfo from "./TooltipInfo";

function BottomItemsNavigationShared({ categoryId, showExtraItems }) {
  const [isOpenClear, setIsOpenClear] = useState(false);

  async function handleClear() {
    await clearCategoryItems(items);
  }

  return (
    <nav className="h-[72px] fixed bottom-0 left-0 w-full bg-white rounded-t-3xl border-t-2 border-t-primary_purple-600">
      <div className="grid grid-cols-1 px-4">
        <div className="py-4 flex items-center justify-center">
          <Link
            data-tooltip-id="shopping-tooltip"
            data-tooltip-content="Start Shopping"
            href={
              showExtraItems
                ? `/shopping/shared/${categoryId}?show=all`
                : `/shopping/shared/${categoryId}`
            }
          >
            <ShoppingCartIcon className="w-10 h-10 text-button-gd hover:text-button-gl" />
          </Link>

          <TooltipInfo id="shopping-tooltip" />
        </div>
      </div>
    </nav>
  );
}

export default BottomItemsNavigationShared;
