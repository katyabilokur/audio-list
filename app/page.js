import { auth } from "./_lib/auth";
import { redirect } from "next/navigation";
import HomeIntro from "./_components/HomeIntro";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/home");
  }

  return <HomeIntro />;
}
