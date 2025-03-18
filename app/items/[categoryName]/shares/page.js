import BackButton from "@/app/_components/BackButton";
import ShareForm from "@/app/_components/forms/ShareForm";
import Container from "@/app/_components/visual/Container";
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
    <Container className="relative z-0 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-96px)] bg-primary_purple-100  flex flex-col">
      <div className="flex flex-col gap-3 max-w-6xl mx-auto mt-8 xs:w-[360px] w-96 sm:w-160 px-4">
        <ShareForm
          categoryName={categoryName}
          existingShares={existingShares}
        />
        <BackButton
          colour="text-primary_purple-700 hover:text-primary_purple-500"
          className="mt-6 mx-auto mb-20"
        >
          Go Back
        </BackButton>
      </div>
    </Container>
  );
}
