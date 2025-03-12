export function mapCategories(categoriesList, byId = true) {
  const categories = new Map();
  categoriesList.forEach((catEl) =>
    byId
      ? categories.set(catEl.id, catEl.name)
      : categories.set(catEl.name, catEl.id)
  );
  return categories;
}

export const maxSharesNumber = 5;
export const defaultCategory1 = { name: "Grocery", icon: "VegetarianFoodIcon" };
export const defaultCategory2 = { name: "Household", icon: "House03Icon" };
export const defaultCategoryFixed = {
  name: "Other",
  icon: "ShoppingBag01Icon",
};

export function capitalizeString(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
