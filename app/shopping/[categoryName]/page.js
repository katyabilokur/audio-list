import ShoppingList from "@/app/_components/ShoppingList";
import Container from "@/app/_components/visual/Container";
import { auth } from "@/app/_lib/auth";
import {
  getCategoryDetailsByName,
  getItemsByCategoryName,
  getSameCategoryItems,
  getSharedItems,
} from "@/app/_lib/data-services";
import { getTempItemsInCart } from "@/app/_lib/data-services-redis";

export default async function Page({ params, searchParams }) {
  const session = await auth();
  const userId = session?.user.userId;

  const searchPar = await searchParams;
  const showExtraItems = searchPar.show === "all";

  const parameters = await params;
  const categoryName = parameters.categoryName;
  const categoryItems = await getItemsByCategoryName(categoryName, userId);

  const categoryDetails = await getCategoryDetailsByName(categoryName, userId);

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

  const inCartItemsId = await getTempItemsInCart(categoryDetails.id, [
    ...new Set(sameCategoryItems.map((el) => el.categoryId)),
  ]);

  return (
    <Container className="relative z-0 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-96px)] bg-white  flex flex-col">
      <ShoppingList
        extraItems={sameCategoryItems}
        showExtraItemsDefault={showExtraItems}
        categorySharedNames={categorySharedNames}
        categoryId={categoryDetails.id}
        categoryDetails={categoryDetails}
        items={categoryItems}
        inCartItemsIds={inCartItemsId}
      />
    </Container>
  );
}
