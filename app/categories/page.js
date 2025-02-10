import ShoppingLists from "../_components/ShoppingLists";
import { auth } from "../_lib/auth";
import { getActiveCategories, getUserItems } from "../_lib/data-services";

export default async function Categories() {
  const session = await auth();
  const curUserId = session?.user.userId;

  const items = await getUserItems(curUserId);
  const catList = Array.from(new Set(items.map((el) => el.categoryId)));
  const categories = await getActiveCategories(catList);

  return (
    <>
      <ShoppingLists categories={categories} items={items} />
    </>
  );
}
