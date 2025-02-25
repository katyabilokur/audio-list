"use client";

import { useState } from "react";
import { clearCategoryItems } from "../_lib/actions";
import Link from "next/link";
import ClearItemsDialog from "./dialogs/ClearItemsDialog";

function BottomItemsNavigation({ items, categoryName, existingShares }) {
  const [isOpenClear, setIsOpenClear] = useState(false);

  async function handleClear() {
    await clearCategoryItems(items);
  }

  return (
    <nav>
      <Link href={`/items/${categoryName}/shares`}>Share</Link>
      <Link href={`/items/${categoryName}/edit`}>Edit</Link>
      <button onClick={() => setIsOpenClear(true)}>Clear</button>
      <ClearItemsDialog
        isOpen={isOpenClear}
        onClose={() => setIsOpenClear(false)}
        onClick={handleClear}
        categoryName={categoryName}
      />
    </nav>
  );
}

export default BottomItemsNavigation;
