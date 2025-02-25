export default function ExistingShares({ categoryName, shares }) {
  return (
    <>
      <h3>
        You are currently sharing {categoryName} with {shares.join(", ")}
      </h3>
    </>
  );
}
