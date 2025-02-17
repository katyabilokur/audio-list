import BottomNavigation from "@/app/_components/BottomNavigation";
import ItemRowView from "@/app/_components/ItemRowView";
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
      {categoryItems.length > 0 && (
        <>
          <h2>{categoryName}</h2>
          {categoryItems.map((itemRow) => (
            <ItemRowView item={itemRow} key={itemRow.name} />
          ))}
          <button>Start shopping</button>
          <button>Back</button>
          <BottomNavigation>
            <button>Share</button>
            <button>Edit</button>
            <button>Clear</button>
          </BottomNavigation>
        </>
      )}
      {categoryItems.length === 0 && (
        <p>No shopping items for {categoryName}</p>
      )}
    </div>
  );
}
