import AnimatedLists from "@/app/_components/AnimatedLists";
import { auth } from "@/app/_lib/auth";
import { getItemsByCategoryName } from "@/app/_lib/data-services";

export default async function Page({ params }) {
  const session = await auth();
  const userId = session?.user.userId;

  const parameters = await params;
  const categoryName = parameters.categoryName;
  const categoryItems = await getItemsByCategoryName(categoryName, userId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <AnimatedLists
        categoryItems={categoryItems}
        categoryName={categoryName}
      />
    </div>
  );
}
