import BackButton from "@/app/_components/BackButton";
import ItemRowView from "@/app/_components/ItemRowView";
import { auth } from "@/app/_lib/auth";
import { getCategoryById, getSharedItems } from "@/app/_lib/data-services";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const session = await auth();

  const parameters = await params;
  const categoryId = +parameters.categoryId;

  const { sharedItems, categorySharedNames } = await getSharedItems(
    session.user.userId,
    session.user.email
  );

  const items = sharedItems.filter((item) => item.categoryId === categoryId);
  const categoryDetails = await getCategoryById(categoryId);

  if (items.length === 0) notFound();

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h2>{`Here are the ${
        categoryDetails.name
      } items shared with you by ${categorySharedNames.get(categoryId)}`}</h2>
      {items.map((itemRow) => (
        <ItemRowView item={itemRow} key={`${itemRow.name}-${itemRow.id}`} />
      ))}
      <Link href={`/shopping/shared/${categoryId}`}>Start shopping</Link>
      <BackButton>Back</BackButton>
    </div>
  );
}
