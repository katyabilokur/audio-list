import BackButton from "@/app/_components/BackButton";
import ExistingShares from "@/app/_components/ExistingShares";
import ShareForm from "@/app/_components/forms/ShareForm";
import { auth } from "@/app/_lib/auth";
import { getSharesByCategoryName } from "@/app/_lib/data-services";

export default async function Page({ params }) {
  const session = await auth();
  const userId = session?.user.userId;

  const parameters = await params;
  const categoryName = parameters.categoryName;

  const currenthares = await getSharesByCategoryName(categoryName, userId);
  const existingShares = currenthares.map((el) => el.email);

  return (
    <div className="flex flex-col gap-3 max-w-6xl mx-auto mt-8">
      <ShareForm categoryName={categoryName} existingShares={existingShares} />
      <BackButton>Go Back</BackButton>
    </div>
  );
}
