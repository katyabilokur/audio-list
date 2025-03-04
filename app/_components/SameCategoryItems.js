"use client";
function SameCategoryItems({ categoryDetails, onClickHandle, showExtraItems }) {
  return (
    <div>
      <p>
        There are items in your shopping cart from other {categoryDetails.name}{" "}
        lists.
      </p>
      <button onClick={onClickHandle}>
        {!showExtraItems ? "Show all items" : "Hide extra items"}
      </button>
    </div>
  );
}

export default SameCategoryItems;
