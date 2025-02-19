import AnimatedLists from "@/app/_components/AnimatedLists";
import BackButton from "@/app/_components/BackButton";
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
      <h2>Start shopping for {categoryName}</h2>
      <AnimatedLists categoryItems={categoryItems} />
      <div className="flex gap-2">
        <BackButton>Go Back</BackButton>
        <button>Finish shopping</button>
      </div>
    </div>
  );
}
