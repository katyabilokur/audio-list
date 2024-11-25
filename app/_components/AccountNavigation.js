"use client";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Profile",
    href: "/account",
    icon: <HomeIcon />,
  },
  {
    name: "My shopping categories",
    href: "/account/categories",
    icon: <CalendarDaysIcon />,
  },
  {
    name: "Shares",
    href: "/account/shares",
    icon: <UserIcon />,
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
