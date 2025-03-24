"use client";

import { updateListItems } from "@/app/_lib/actions";
import EditListRow from "./EditListRow";
import { useFormStatus } from "react-dom";
import BackButton from "../BackButton";
import { useState } from "react";
import PaperElement from "../visual/PaperElement";
import { capitalizeString } from "@/app/_lib/dataHelpers";
import { XMarkIcon } from "@heroicons/react/24/outline";
import TooltipInfo from "../TooltipInfo";

function UpdateItemsForm({ list, categories, categoryName }) {
  const [rows, setRows] = useState(list);
  const [removedIds, setRemovedIds] = useState([]);

  const handleRemove = (id) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
    setRemovedIds((prev) => [...prev, id]);
  };

  return (
    <form
      action={updateListItems}
      className="bg-primary-900 my-4 sm:my-6 px-2 sm:px-12 text-lg flex gap-2 flex-col"
    >
      <PaperElement>
        <div className="flex gap-4 mb-2 mx-auto items-end">
          <h2 className="italic text-base sm:text-lg font-medium text-zinc-600">
            {categoryName
              ? `Edit items from ${capitalizeString(categoryName)} list`
              : "Check and update new added items"}
          </h2>
        </div>

        <hr className="w-full h-[1.5px] mt-2 mb-[6px] bg-primary_rose-600 border-0"></hr>
        <hr className="w-full h-[1.5px] bg-primary_rose-600 border-0 mb-4"></hr>

        {rows.length > 0 &&
          rows.map((el, index) => (
            <div key={el.name}>
              <div className="flex gap-2 px-3 sm:px-6">
                <EditListRow row={el} categories={categories} />
                <button
                  data-tooltip-id="delete"
                  data-tooltip-content="Delete item"
                  onClick={() => handleRemove(el.id)}
                >
                  <XMarkIcon className="h-4 sm:h-5 text-zinc-600 hover:text-primary_purple-600 " />
                </button>
                <TooltipInfo id="delete" />
              </div>
              {index < rows.length - 1 && (
                <hr className="w-full border-t border-primary_blue-300 my-2" />
              )}
            </div>
          ))}
      </PaperElement>
      <input
        type="hidden"
        name="removedIds"
        value={JSON.stringify(removedIds)}
      />
      <div className="flex justify-end align-middle gap-8 mb-4 sm:mb-6">
        <BackButton colour="text-primary_blue-500 hover:text-primary_blue-400">
          Cancel
        </BackButton>
        <Button />
      </div>
    </form>
  );
}

function Button() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="text-white text-sm sm:text-base bg-primary_blue-500 border hover:bg-primary_blue-600 focus:ring-4 focus:ring-primary_purple-300 font-medium rounded-2xl px-6 sm:px-8 py-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-zinc-400 disabled:text-zinc-200"
    >
      {pending ? "Saving..." : "Save items"}
    </button>
  );
}

export default UpdateItemsForm;
