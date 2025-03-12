"use client";

import { redirect, useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function BackButton({
  children,
  className,
  redirectPath = null,
}) {
  function handleClick() {
    if (redirectPath) {
      redirect(redirectPath);
    } else {
      router.back();
    }
  }

  const router = useRouter();

  return (
    <button
      className={`flex items-center gap-2 text-primary_tur-500 hover:text-primary_tur-400 text-base sm:text-lg font-semibold ${
        className && className
      }`}
      onClick={handleClick}
    >
      <ArrowLeftIcon className="w-5 h-5" />
      {children}
    </button>
  );
}
