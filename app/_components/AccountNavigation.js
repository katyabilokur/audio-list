"use client";
import {
  UserCircleIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TooltipInfo from "./TooltipInfo";
import { signOutAction } from "../_lib/actions";

function AccountNavigation() {
  const pathname = usePathname();

  return (
    <nav className="h-[72px] fixed bottom-0 left-0 w-full bg-white rounded-t-3xl border-t-2 border-t-primary_purple-600">
      <div className="grid grid-cols-4 px-4">
        <div className="border-r-2 border-primary_purple-600 py-4 flex items-center justify-center">
          <Link
            data-tooltip-id="home-tooltip"
            data-tooltip-content="My Profile"
            href="/account"
          >
            <UserCircleIcon className="w-10 h-10 text-primary_blue-600 hover:text-primary_blue-500" />
          </Link>
          <TooltipInfo id="home-tooltip" />
        </div>

        <div className="border-r-2 border-primary_purple-600 flex items-center justify-center">
          <Link
            href="/account/categories"
            data-tooltip-id="categories-tooltip"
            data-tooltip-content="Manage your categories"
          >
            <ClipboardDocumentListIcon className="w-10 h-10 text-primary_purple-700 hover:text-primary_purple-600" />
          </Link>
          <TooltipInfo id="categories-tooltip" />
        </div>
        <div className="border-r-2 border-primary_purple-600 flex items-center justify-center">
          <Link
            href="/account/shares"
            data-tooltip-id="shares-tooltip"
            data-tooltip-content="Manage your shares"
          >
            <UserGroupIcon className="w-10 h-10 text-primary_tur-400 hover:text-primary_tur-300" />
          </Link>
          <TooltipInfo id="shares-tooltip" />
        </div>
        <div className="flex items-center justify-center">
          <form action={signOutAction}>
            <button
              data-tooltip-id="logout-tooltip"
              data-tooltip-content="Log out"
            >
              <ArrowRightStartOnRectangleIcon className="w-10 h-10 text-primary_rose-500 hover:text-primary_rose-400" />
            </button>
            <TooltipInfo id="logout-tooltip" />
          </form>
        </div>
      </div>
    </nav>
  );
}

export default AccountNavigation;
