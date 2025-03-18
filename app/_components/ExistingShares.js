export default function ExistingShares({ categoryName, shares }) {
  return (
    <>
      <h3>
        You are currently sharing {categoryName} with{" "}
        <span className="font-medium mb-4">{shares.join(", ")}</span>
      </h3>
    </>
  );
}
