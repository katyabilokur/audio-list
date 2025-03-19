import { getCategories } from "@/app/_lib/data-services";

export default async function Categories() {
  const categories = await getCategories(12);

  if (!categories.length) return null;

  return (
    <>
      <p>
        Here you can manage your categories. Stay tuned. We will implement it
        soon. So far you have the following categories available for use:{" "}
      </p>
      <ul>
        {categories.map((category) => (
          <li key={category.name}>{category.name}</li>
        ))}
      </ul>
    </>
  );
}
