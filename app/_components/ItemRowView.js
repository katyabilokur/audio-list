function ItemRowView({ item }) {
  return (
    <div className="flex gap-2 mx-8 text-zinc-600 text-lg">
      <p>
        <span className="font-semibold text-zinc-800">
          {item.quantity === 0 ? "some" : item.quantity}{" "}
        </span>
        {item.quantity !== 0 && `${item.unit} of `}
        <span className="font-semibold text-zinc-800">{item.name}</span>{" "}
        {item.note && (
          <span className="italic text-zinc-500">({item.note})</span>
        )}
      </p>
    </div>
  );
}

export default ItemRowView;
