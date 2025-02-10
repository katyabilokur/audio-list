import Link from "next/link";

export default function Navigation({ image, name }) {
  return (
    <nav className="bg-red-400 h-20">
      <ul className="flex justify-evenly list-none">
        <li>
          <Link href="/">Logo</Link>
        </li>
        <li>
          <Link href="/categories">My lists</Link>
        </li>
        <li>
          <Link className="flex gap-2" href="/account">
            <img
              className="rounded-full h-10"
              src={image}
              alt={name}
              referrerPolicy="no-referrer"
            />
            <span>My account</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
