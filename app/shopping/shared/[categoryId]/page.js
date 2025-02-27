import AnimatedLists from "@/app/_components/AnimatedLists";
import { auth } from "@/app/_lib/auth";
import { getCategoryById, getSharedItems } from "@/app/_lib/data-services";
import { getTempItemsInCart } from "@/app/_lib/data-services-redis";

export default async function Page({ params }) {
  //TODO: code refactoring to create a global state.
  // The following code is repeated from View shared page
  const session = await auth();

  const parameters = await params;
  const categoryId = +parameters.categoryId;

  const { sharedItems, categorySharedNames } = await getSharedItems(
    session.user.userId,
    session.user.email
  );

  const items = sharedItems.filter((item) => item.categoryId === categoryId);

  const categoryDetails = await getCategoryById(categoryId);
  const inCartItemsId = await getTempItemsInCart(categoryId);

  if (items.length === 0) notFound();
  //--------
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h2>{`Start shopping for ${
        categoryDetails.name
      }  shared with you by ${categorySharedNames.get(categoryId)}`}</h2>
      <AnimatedLists categoryItems={items} alreadyInCartIds={inCartItemsId} />
    </div>
  );
}
