"use client";
function SameCategoryItems({ categoryDetails, onClickHandle, showExtraItems }) {
  return (
    <div>
      <p>
        There are items in your to do shopping list from other{" "}
        {categoryDetails.name} lists.
      </p>
      <button onClick={onClickHandle}>
        {!showExtraItems ? "Show all items" : "Hide extra items"}
      </button>
    </div>
  );
}

export default SameCategoryItems;
