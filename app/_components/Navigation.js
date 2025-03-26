"use client";
import Link from "next/link";
import Logo from "./visual/Logo";
import { useTranslations } from "next-intl";

export default function Navigation({ image, name }) {
  const t = useTranslations("Navigation");

  return (
    <nav className="min-w-screen bg-primary_purple-600 h-20 sm:h-24 py-2 px-6 sm:p-4 flex justify-center items-center">
      <ul className="flex justify-between list-none w-80 sm:w-160">
        <li>
          <Link href="/">
            <div className="mx-auto relative h-8 w-8 sm:h-12 sm:w-12 stroke-[1.2]">
              <Logo colour="text-white" />
            </div>
          </Link>
        </li>
        <li>
          <Link
            className="flex gap-3 justify-center items-center"
            href="/account"
          >
            <img
              className="rounded-full h-8 sm:h-10 border"
              src={image}
              alt={name}
              referrerPolicy="no-referrer"
            />
            <span className=" text-white text-lg">{t("myAccount")}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
