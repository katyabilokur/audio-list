import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Logo</Link>
        </li>
        {session?.user && (
          <li>
            <Link href="/categories">Categories</Link>
          </li>
        )}
        <li>
          {session?.user?.image && (
            <Link href="/account">
              <img
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>My account</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
