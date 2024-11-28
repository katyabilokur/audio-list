import AudioRecorder from "../_components/AudioRecorder";
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
    <div className="flex flex-col h-full justify-between">
      <ShoppingLists categories={categories} items={items} />
      <AudioRecorder className="mt-auto" />
    </div>
  );
}
