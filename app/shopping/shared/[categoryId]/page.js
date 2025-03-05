import ShoppingList from "@/app/_components/ShoppingList";
import { auth } from "@/app/_lib/auth";
import {
  getCategoryById,
  getSameCategoryItems,
  getSharedItems,
} from "@/app/_lib/data-services";
import { getTempItemsInCart } from "@/app/_lib/data-services-redis";

export default async function Page({ params, searchParams }) {
  const searchPar = await searchParams;
  const showExtraItems = searchPar.show === "all";

  //TODO: code refactoring to create a global state.
  // Some  code is repeated from View shared page

  const session = await auth();

  const parameters = await params;
  const categoryId = +parameters.categoryId;

  const { sharedItems, categorySharedNames } = await getSharedItems(
    session.user.userId,
    session.user.email
  );

  const items = sharedItems.filter((item) => item.categoryId === categoryId);

  if (items.length === 0) notFound();

  const categoryDetails = await getCategoryById(categoryId);

  //-----
  const sameCategoryItems = [];

  if (categorySharedNames?.length > 0) {
    sameCategoryItems = await getSameCategoryItems(
      session.user.userId,
      categoryId,
      categoryDetails.name,
      Array.from(categorySharedNames.keys())
    );
  }

  const inCartItemsIds = await getTempItemsInCart(categoryId, [
    ...new Set(sameCategoryItems.map((el) => el.categoryId)),
  ]);

  return (
    <ShoppingList
      extraItems={sameCategoryItems}
      showExtraItemsDefault={showExtraItems}
      categorySharedNames={categorySharedNames}
      categoryId={categoryId}
      categoryDetails={categoryDetails}
      items={items}
      inCartItemsIds={inCartItemsIds}
    />
  );
}
