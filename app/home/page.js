import Container from "../_components/visual/Container";
import ShoppingLists from "../_components/ShoppingLists";
import { auth } from "../_lib/auth";
import {
  getActiveCategories,
  getSharedItems,
  getUserItems,
} from "../_lib/data-services";
import Card from "../_components/visual/Card";
import AudioContainer from "../_components/AudioContainer";
import HomeEmptyLists from "../_components/textElements/HomeEmptyLists";

export const metadata = {
  title: "Home",
};

export default async function Home() {
  const session = await auth();
  const curUserId = session?.user.userId;
  const curUserLan = session?.user.language;

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
    <Container className="min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-96px)] bg-primary_tur-100 flex flex-col  ">
      <AudioContainer curUserId={curUserId} language={curUserLan}>
        <Card extraStyling="pt-4 pb-8 sm:py-8 px-4">
          {items.length > 0 ? (
            <ShoppingLists
              categories={categories}
              items={items}
              title="myLists"
            />
          ) : (
            <HomeEmptyLists />
          )}
        </Card>
        {sharedItems?.length > 0 && (
          <Card extraStyling="pt-4 pb-8 sm:py-8 px-4">
            <ShoppingLists
              shared={true}
              sharedNames={categorySharedNames}
              categories={sharedCategories}
              items={sharedItems}
              title="sharedLists"
            />
          </Card>
        )}
      </AudioContainer>
    </Container>
  );
}
