export function mapCategories(categoriesList, byId = true) {
  const categories = new Map();
  categoriesList.forEach((catEl) =>
    byId
      ? categories.set(catEl.id, catEl.name)
      : categories.set(catEl.name, catEl.id)
  );
  return categories;
}
