import UpdateItemsForm from "@/app/_components/forms/UpdateItemsForm";
import Container from "@/app/_components/visual/Container";
import { auth } from "@/app/_lib/auth";
import {
  getCategories,
  getItemsByCategoryName,
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
    <Container className="relative z-0 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-96px)] bg-primary_blue-100  flex flex-col">
      <div className="xs:w-[370px] w-96 sm:w-160 md:w-full mx-auto mt-8 px-4">
        {items.length > 0 && (
          <UpdateItemsForm
            categoryName={parameters.categoryName}
            list={items}
            categories={categories}
          />
        )}
        {items.length === 0 && <p>No items to edit</p>}
      </div>
    </Container>
  );
}
