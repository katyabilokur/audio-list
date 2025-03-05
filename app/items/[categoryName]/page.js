import OwnItems from "@/app/_components/OwnItems";
import { auth } from "@/app/_lib/auth";
import {
  getCategoryDetailsByName,
  getItemsByCategoryName,
  getSameCategoryItems,
  getSharedItems,
} from "@/app/_lib/data-services";

export default async function Page({ params }) {
  const session = await auth();
  const userId = session?.user.userId;

  const parameters = await params;
  const categoryName = parameters.categoryName;
  const categoryItems = await getItemsByCategoryName(categoryName, userId);
  const categoryDetails = await getCategoryDetailsByName(categoryName, userId);

  if (categoryItems.length === 0) notFound();

  const { categorySharedNames } = await getSharedItems(
    session.user.userId,
    session.user.email
  );

  const sameCategoryItems = [];

  if (categorySharedNames?.length > 0) {
    sameCategoryItems = await getSameCategoryItems(
      session.user.userId,
      categoryDetails.id,
      categoryName,
      Array.from(categorySharedNames.keys())
    );
  }

  return (
    <OwnItems
      items={categoryItems}
      categoryName={categoryName}
      sameCategoryItems={sameCategoryItems}
      categoryDetails={categoryDetails}
    />
  );
}
