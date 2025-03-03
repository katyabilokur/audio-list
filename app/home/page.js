import AudioRecorder from "../_components/AudioRecorder";
import ShoppingLists from "../_components/ShoppingLists";
import { auth } from "../_lib/auth";
import {
  getActiveCategories,
  getSharedItems,
  getUserItems,
} from "../_lib/data-services";

export const metadata = {
  title: "Home",
};

export default async function Home() {
  const session = await auth();
  const curUserId = session?.user.userId;

  const items = await getUserItems(curUserId);
  const catList = Array.from(new Set(items.map((el) => el.categoryId)));
  const categories = await getActiveCategories(catList);

  const { sharedItems, categorySharedNames } = await getSharedItems(
    curUserId,
    session.user.email
  );

  let sharedCategories = null;

  if (sharedItems?.length > 0) {
    sharedCategories = await getActiveCategories(
      sharedItems.map((el) => el.categoryId)
    );
  }

  return (
    <div className="flex flex-col h-full justify-between">
      {items.length > 0 ? (
        <ShoppingLists
          categories={categories}
          items={items}
          title="My shopping lists"
        />
      ) : (
        <p>
          You do not have any items to buy yet. Start recording to add to your
          existing categories
        </p>
      )}

      {sharedItems?.length > 0 && (
        <ShoppingLists
          shared={true}
          sharedNames={categorySharedNames}
          categories={sharedCategories}
          items={sharedItems}
          title="Lists shared with me"
        />
      )}
      <AudioRecorder className="mt-auto" userId={curUserId} />
    </div>
  );
}
