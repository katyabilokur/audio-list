import Link from "next/link";

export default function Navigation({ image, name }) {
  return (
    <nav className="bg-red-400">
      <ul className="flex justify-evenly list-none">
        <li>
          <Link href="/">Logo</Link>
        </li>
        <li>My List</li>
        <li>
          <Link href="/account">
            <img
              className="rounded-full h-20"
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
