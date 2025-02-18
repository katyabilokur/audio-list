import UpdateItemsForm from "@/app/_components/forms/UpdateItemsForm";
import { auth } from "@/app/_lib/auth";
import {
  getCategories,
  getItemsByCategoryName,
  getItemsByFileId,
} from "@/app/_lib/data-services";
import { mapCategories } from "@/app/_lib/dataHelpers";

export default async function Page({ params }) {
  const session = await auth();
  const userId = session?.user.userId;

  const parameters = await params;
  const items = await getItemsByCategoryName(parameters.categoryName, userId);

  //TODO: take categories from context, implement later
  const categoriesList = await getCategories(userId);
  const categories = mapCategories(categoriesList);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      {items.length > 0 && (
        <>
          <UpdateItemsForm list={items} categories={categories} />
        </>
      )}
      {items.length === 0 && <p>No items to edit</p>}
    </div>
  );
}
