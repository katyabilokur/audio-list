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
export const defaultCategory1 = "Grocery";
export const defaultCategory2 = "Household";
export const defaultCategoryFixed = "Other";
