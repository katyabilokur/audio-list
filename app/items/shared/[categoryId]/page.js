import SharedItems from "@/app/_components/SharedItems";
import Container from "@/app/_components/visual/Container";
import { auth } from "@/app/_lib/auth";
import {
  getCategoryById,
  getSameCategoryItems,
  getSharedItems,
} from "@/app/_lib/data-services";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const session = await auth();

  const parameters = await params;
  const categoryId = +parameters.categoryId;

  const { sharedItems, categorySharedNames } = await getSharedItems(
    session.user.userId,
    session.user.email
  );

  const items = sharedItems.filter((item) => item.categoryId === categoryId);
  const categoryDetails = await getCategoryById(categoryId);

  if (items.length === 0) notFound();

  //Check if there are categories with the same name to include items
  let sameCategoryItems = [];

  if (categorySharedNames?.size > 0) {
    sameCategoryItems = await getSameCategoryItems(
      session.user.userId,
      categoryId,
      categoryDetails.name,
      Array.from(categorySharedNames.keys())
    );
  }

  //----

  return (
    <Container className="relative z-0 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-96px)] bg-primary_rose-100  flex flex-col">
      <SharedItems
        sameCategoryItems={sameCategoryItems}
        categoryDetails={categoryDetails}
        items={items}
        categorySharedNames={categorySharedNames}
        categoryId={categoryId}
      />
    </Container>
  );
}
