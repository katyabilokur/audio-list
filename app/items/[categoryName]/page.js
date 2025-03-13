import OwnItems from "@/app/_components/OwnItems";
import Container from "@/app/_components/visual/Container";
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

  let sameCategoryItems = [];

  if (categorySharedNames?.size > 0) {
    sameCategoryItems = await getSameCategoryItems(
      session.user.userId,
      categoryDetails.id,
      categoryName,
      Array.from(categorySharedNames.keys())
    );
  }

  return (
    <Container className="relative z-0 min-h-[calc(100vh+6px)] sm:min-h-[calc(100vh-24px)] bg-primary_rose-100  flex flex-col">
      <OwnItems
        items={categoryItems}
        categoryName={categoryName}
        sameCategoryItems={sameCategoryItems}
        categoryDetails={categoryDetails}
      />
    </Container>
  );
}
