import Link from "next/link";
import { auth } from "./_lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <>
      {session?.user ? (
        <div>Hello! It is our Start screen</div>
      ) : (
        <div>
          Please login first to use Audio List App
          <Link href="/login">Log in</Link>
        </div>
      )}
    </>
  );
}
