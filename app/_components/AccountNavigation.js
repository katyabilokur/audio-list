"use client";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styled from "styled-components";

const StyledLink = styled(Link)`
  svg {
    width: 20px;
    height: 20px;
  }
`;

const navLinks = [
  {
    name: "Profile",
    href: "/account",
    icon: <HomeIcon />,
  },
  {
    name: "My shopping categories",
    href: "/account/categories",
    icon: <ClipboardDocumentListIcon />,
  },
  {
    name: "Shares",
    href: "/account/shares",
    icon: <UserPlusIcon />,
  },
];

function AccountNavigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        {navLinks.map((link) => (
          <li key={link.name}>
            <StyledLink
              className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                pathname === link.href ? "bg-primary-900" : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </StyledLink>
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
