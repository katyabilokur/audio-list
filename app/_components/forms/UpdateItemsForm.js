"use client";

import { updateListItems } from "@/app/_lib/actions";
import EditListRow from "./EditListRow";
import { useFormStatus } from "react-dom";
import BackButton from "../BackButton";
import { useState } from "react";

function UpdateItemsForm({ list, categories }) {
  const [rows, setRows] = useState(list);
  const [removedIds, setRemovedIds] = useState([]);

  const handleRemove = (id) => {
    setRows((prev) => list.filter((row) => row.id !== id));
    setRemovedIds((prev) => [...prev, id]);
  };

  return (
    <form
      action={updateListItems}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div>
        {rows.map((el) => (
          <div className="flex gap-2" key={el.name}>
            <EditListRow row={el} categories={categories} />
            <button onClick={() => handleRemove(el.id)}>X</button>
          </div>
        ))}
      </div>
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
