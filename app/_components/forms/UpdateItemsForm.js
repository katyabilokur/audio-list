"use client";

import { updateListItems } from "@/app/_lib/actions";
import EditListRow from "./EditListRow";
import { useFormStatus } from "react-dom";

function UpdateItemsForm({ list, categories }) {
  return (
    <form
      action={updateListItems}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div>
        {list.map((el) => (
          <EditListRow row={el} key={el.name} categories={categories} />
        ))}
      </div>
      <div className="flex justify-end items-center gap-6">
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
