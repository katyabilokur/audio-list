"use client";

import { Description, Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import { clearCategoryItems, shareList } from "../_lib/actions";
import Link from "next/link";
import ShareForm from "./forms/ShareForm";

function BottomItemsNavigation({ items, categoryName, existingShares }) {
  const [isOpenClear, setIsOpenClear] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [currentShares, setCurrentShares] = useState(existingShares);

  async function handleClear() {
    await clearCategoryItems(items);
  }

  return (
    <nav>
      <button onClick={() => setIsOpenShare(true)}>Share</button>
      <Link href={`/items/${categoryName}/edit`}>Edit</Link>
      <button onClick={() => setIsOpenClear(true)}>Clear</button>
      <Dialog
        open={isOpenShare}
        onClose={() => setIsOpenShare(false)}
        transition
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            //TODO: fix the bug with closing window on invalid email
            // onKeyDown={handleKeyDown}
            className="max-w-lg space-y-4 border bg-white p-12"
          >
            <Description>
              Sharing items in {categoryName}. Provide an email with who you
              want to share this list
            </Description>
            {existingShares.length !== 0 && (
              <p>
                You are already sharing this list with
                {currentShares.map((el) => el.email).join(", ")}
              </p>
            )}
            <ShareForm
              categoryName={categoryName}
              setIsOpenShare={setIsOpenShare}
              setCurrentShares={setCurrentShares}
            />
          </DialogPanel>
        </div>
      </Dialog>
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
