import AnimatedLists from "@/app/_components/AnimatedLists";
import { auth } from "@/app/_lib/auth";
import { getItemsByCategoryName } from "@/app/_lib/data-services";
import { getTempItemsInCart } from "@/app/_lib/data-services-redis";

export default async function Page({ params }) {
  const session = await auth();
  const userId = session?.user.userId;

  const parameters = await params;
  const categoryName = parameters.categoryName;
  const categoryItems = await getItemsByCategoryName(categoryName, userId);

  const inCartItemsId = await getTempItemsInCart(categoryItems[0].categoryId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h2>Start shopping for {categoryName}</h2>
      <AnimatedLists
        categoryItems={categoryItems}
        alreadyInCartIds={inCartItemsId}
      />
    </div>
  );
}
