// "use client";

export default function EditListRow({ row, categories }) {
  const cats = Array.from(categories.values());
  return (
    <div className="flex gap-2">
      {/* Category selection */}
      <select
        name="category"
        id="category"
        defaultValue={categories.get(row.categoryId)}
        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        required
      >
        {cats.map((cat) => (
          <option value={cat} key={cat}>
            {cat}
          </option>
        ))}
      </select>
      {/* Quantity */}
      <input
        type="number"
        defaultValue={row.quantity}
        name="quantity"
        min="0"
        step="0.1"
        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
      />

      {/* Unit */}
      <input
        type="text"
        defaultValue={row.unit}
        name="unit"
        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
      />
      {/* Name */}
      <input
        type="text"
        defaultValue={row.name}
        name="name"
        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
      />
      {/* Notes */}
      <textarea
        defaultValue={row.note}
        name="note"
        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
      />
    </div>
  );
}
