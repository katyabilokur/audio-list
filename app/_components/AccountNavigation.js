"use client";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Profile",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    name: "My shopping categories",
    href: "/account/categories",
    icon: <ClipboardDocumentListIcon className="h-5 w-5" />,
  },
  {
    name: "Shares",
    href: "/account/shares",
    icon: <UserPlusIcon className="h-5 w-5" />,
  },
];

function AccountNavigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                pathname === link.href ? "bg-primary-900" : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default AccountNavigation;
