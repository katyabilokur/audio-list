"use client";

import { Description, Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import { clearCategoryItems } from "../_lib/actions";

function BottomItemsNavigation({ items, categoryName }) {
  let [isOpenClear, setIsOpenClear] = useState(false);

  async function handleClear() {
    await clearCategoryItems(items);
  }

  return (
    <nav>
      <button>Share</button>
      <button>Edit</button>
      <button onClick={() => setIsOpenClear(true)}>Clear</button>
      <Dialog
        open={isOpenClear}
        onClose={() => setIsOpenClear(false)}
        transition
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <Description>
              This will permanently delete all items from {categoryName}
            </Description>
            <p>Are you sure you want to clear all selected items?</p>
            <div className="flex gap-4">
              <button onClick={() => setIsOpenClear(false)}>Cancel</button>
              <button onClick={handleClear}>Clear all</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </nav>
  );
}

export default BottomItemsNavigation;
