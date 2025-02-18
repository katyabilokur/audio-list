import BackButton from "@/app/_components/BackButton";
import BottomItemsNavigation from "@/app/_components/BottomItemsNavigation";
import ItemRowView from "@/app/_components/ItemRowView";
import { auth } from "@/app/_lib/auth";
import { getItemsByCategoryName } from "@/app/_lib/data-services";
import Link from "next/link";

export default async function Page({ params }) {
  const session = await auth();
  const userId = session?.user.userId;

  const parameters = await params;
  const categoryName = parameters.categoryName;
  const categoryItems = await getItemsByCategoryName(categoryName, userId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      {categoryItems.length > 0 && (
        <>
          <h2>{categoryName}</h2>
          {categoryItems.map((itemRow) => (
            <ItemRowView item={itemRow} key={itemRow.name} />
          ))}
          <Link href={`shopping/${categoryName}`}>Start shopping</Link>
          <BackButton>Back</BackButton>
          <BottomItemsNavigation
            items={categoryItems}
            categoryName={categoryName}
          />
        </>
      )}
      {categoryItems.length === 0 && (
        <p>No shopping items for {categoryName}</p>
      )}
    </div>
  );
}
