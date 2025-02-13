import UpdateItemsForm from "@/app/_components/forms/UpdateItemsForm";
import { auth } from "@/app/_lib/auth";
import { getCategories, getItemsByFileId } from "@/app/_lib/data-services";
import { mapCategories } from "@/app/_lib/dataHelpers";

export default async function Page({ params }) {
  const session = await auth();
  const userId = session?.user.userId;

  const parameters = await params;
  const unconfirmedItems = await getItemsByFileId(parameters.fileId, userId);

  //TODO: take categories from context, implement later
  const categoriesList = await getCategories(userId);
  const categories = mapCategories(categoriesList);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      {unconfirmedItems.length > 0 && (
        <>
          <h2>Please review and confirm all added items</h2>
          <UpdateItemsForm list={unconfirmedItems} categories={categories} />
        </>
      )}
      {unconfirmedItems.length === 0 && (
        <p>No items to confirm under the given recording</p>
      )}
    </div>
  );
}
