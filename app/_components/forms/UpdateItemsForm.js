"use client";

import { updateListItems } from "@/app/_lib/actions";
import EditListRow from "./EditListRow";
import { useFormStatus } from "react-dom";
import BackButton from "../BackButton";
import { useState } from "react";
import PaperElement from "../visual/PaperElement";
import * as IconSet from "hugeicons-react";
import { capitalizeString } from "@/app/_lib/dataHelpers";

function UpdateItemsForm({ list, categories, categoryName }) {
  const [rows, setRows] = useState(list);
  const [removedIds, setRemovedIds] = useState([]);

  const handleRemove = (id) => {
    setRows((prev) => list.filter((row) => row.id !== id));
    setRemovedIds((prev) => [...prev, id]);
  };

  // const HugeIcon = IconSet[categoryDetails.icon];

  return (
    <form
      action={updateListItems}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <PaperElement>
        <div className="flex gap-4 mb-2 mx-auto items-end">
          {/* <HugeIcon className="w-8 h-8 text-primary_tur-500" /> */}
          <h2 className="italic text-base sm:text-lg font-medium text-zinc-600">
            Edit items from {capitalizeString(categoryName)}
          </h2>
        </div>

        <hr className="w-full h-[1.5px] mt-2 mb-[6px] bg-primary_rose-600 border-0"></hr>
        <hr className="w-full h-[1.5px] bg-primary_rose-600 border-0 mb-4"></hr>

        {rows.map((el, index) => (
          <div key={el.name}>
            <div className="flex gap-2 px-4 sm:px-6">
              <EditListRow row={el} categories={categories} />
              <button onClick={() => handleRemove(el.id)}>X</button>
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
      <div className="flex justify-end items-center gap-6">
        <BackButton>Cancel</BackButton>
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
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? "Saving..." : "Save items"}
    </button>
  );
}

export default UpdateItemsForm;
