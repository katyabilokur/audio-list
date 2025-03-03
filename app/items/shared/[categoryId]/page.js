import SharedItems from "@/app/_components/SharedItems";
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
  const sameCategoryItems = await getSameCategoryItems(
    session.user.userId,
    categoryId,
    categoryDetails.name,
    Array.from(categorySharedNames.keys())
  );

  //----

  return (
    <SharedItems
      sameCategoryItems={sameCategoryItems}
      categoryDetails={categoryDetails}
      items={items}
      categorySharedNames={categorySharedNames}
      categoryId={categoryId}
    />
  );
}
