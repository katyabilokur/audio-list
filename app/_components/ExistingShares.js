export default function ExistingShares({ categoryName, shares }) {
  console.log(shares);
  console.log(typeof shares);
  return (
    <>
      <h3>
        You are currently sharing {categoryName} with {shares.join(", ")}
      </h3>
    </>
  );
}
