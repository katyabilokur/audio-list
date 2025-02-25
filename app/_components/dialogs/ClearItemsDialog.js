"use client";

import { Description, Dialog, DialogPanel } from "@headlessui/react";
export default function ClearItemsDialog({
  isOpen,
  onClose,
  onClick,
  categoryName,
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
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
            <button onClick={onClose}>Cancel</button>
            <button onClick={onClick}>Clear all</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
