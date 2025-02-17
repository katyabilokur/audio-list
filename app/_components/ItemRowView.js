function ItemRowView({ item }) {
  return (
    <div className="flex gap-2">
      <div>{item.quantity}</div>
      <div>{item.unit}</div>
      <div>{item.note}</div>
      <div>{item.name}</div>
    </div>
  );
}

export default ItemRowView;
