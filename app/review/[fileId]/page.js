import UpdateItemsForm from "@/app/_components/forms/UpdateItemsForm";
import Container from "@/app/_components/visual/Container";
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
    <Container className="relative z-0 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-96px)] bg-primary_blue-100  flex flex-col">
      <div className="xs:w-full w-96 sm:w-160 md:w-[900px] mx-auto mt-4 sm:mt-8 px-2 sm:px-4">
        {unconfirmedItems.length > 0 && (
          <>
            <p className="text-center">
              Please review and confirm all added items
            </p>
            <UpdateItemsForm list={unconfirmedItems} categories={categories} />
          </>
        )}
        {unconfirmedItems.length === 0 && (
          <p className="text-center">
            No items to confirm under the given recording
          </p>
        )}
      </div>
    </Container>
  );
}
