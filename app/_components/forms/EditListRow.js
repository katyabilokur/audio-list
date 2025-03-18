// "use client";

import Select from "../visual/Select";

export default function EditListRow({ row, categories }) {
  const cats = Array.from(categories.values());

  const inputClass = `w-full bg-transparent placeholder:text-zinc-400 text-zinc-700 
    text-sm border border-transparent rounded-md px-3
    transition duration-300 ease focus:outline-none 
    focus:border-zinc-200 hover:border-zinc-200`;

  return (
    <div className="grid grid-cols-3 grid-rows-2 sm:grid-rows-1 sm:grid-cols-[2fr_1fr_2fr_3fr_2fr] gap-2">
      <input type="hidden" value={row.id} name="itemId" />
      {/* Category selection */}
      <Select
        name="category"
        options={cats}
        defaultValue={categories.get(row.categoryId)}
        className="row-span-2 sm:row-span-1"
      />
      {/* Quantity */}
      <input
        type="number"
        defaultValue={row.quantity}
        name="quantity"
        min="0"
        step="0.1"
        placeholder="quantity"
        className={`${inputClass} font-medium`}
      />

      {/* Unit */}
      <input
        type="text"
        defaultValue={row.unit}
        name="unit"
        placeholder="unit"
        className={inputClass}
      />
      {/* Name */}
      <input
        type="text"
        defaultValue={row.name}
        name="name"
        placeholder="name"
        className={`${inputClass} font-medium`}
      />
      {/* Notes */}
      <input
        defaultValue={row.note}
        name="note"
        placeholder="note"
        className={inputClass}
      />
    </div>
  );
}
