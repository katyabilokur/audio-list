import TestTitle from "../_components/TestTitle";
import { getCategories } from "../_lib/data-services";

//NOTE: this is a test page so far
//TODO: add functionality in R2
export default async function Categories() {
  const categories = await getCategories();

  if (!categories.length) return null;

  return (
    <>
      <TestTitle />
      <ul>
        {categories.map((category) => (
          <li key={category.name}>{category.name}</li>
        ))}
      </ul>
    </>
  );
}
