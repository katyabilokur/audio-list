"use client";

import { Description, Dialog, DialogPanel } from "@headlessui/react";

export default function ConfirmationDialog({ isOpen, text, onClose }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
          <Description>{text}</Description>
          <div className="flex gap-4">
            <button onClick={onClose}>Ok</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
