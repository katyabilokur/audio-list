"use client";

import { capitalizeString } from "@/app/_lib/dataHelpers";
import { Description, Dialog, DialogPanel } from "@headlessui/react";
export default function ClearItemsDialog({
  isOpen,
  onClose,
  onClick,
  categoryName,
  sharedItemsExist,
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      transition
      className="fixed z-[1000] inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="rounded-xl text-zinc-700 max-w-lg space-y-4 border bg-white p-12">
          <Description>
            This will permanently delete all items from{" "}
            <span className="font-medium">
              {capitalizeString(categoryName)}
            </span>
            .{" "}
            {sharedItemsExist &&
              `Please note, this will clear only your own items. It will not remove any items shared with you.`}
          </Description>
          <p className="text-zinc-500">
            Are you sure you want to clear all selected items?
          </p>
          <div className="flex gap-4">
            <button
              className="text-zinc-600 hover:text-primary_purple-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="font-medium text-primary_tur-600 hover:text-primary_tur-400"
              onClick={onClick}
            >
              Clear all
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
