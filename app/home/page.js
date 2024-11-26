import RecordButton from "../_components/RecordButton";
import ShoppingLists from "../_components/ShoppingLists";
import { auth } from "../_lib/auth";
import { getActiveCategories, getUserItems } from "../_lib/data-services";

export const metadata = {
  title: "Home",
};

export default async function Home() {
  const session = await auth();
  const curUserId = session?.user.userId;

  const items = await getUserItems(curUserId);
  const catList = Array.from(new Set(items.map((el) => el.categoryId)));
  const categories = await getActiveCategories(catList);

  return (
    <>
      <h2>My shopping lists</h2>

      <ShoppingLists categories={categories} items={items} />
      <RecordButton />
    </>
  );
}
