"use client";

import { redirect, useRouter } from "next/navigation";

export default function BackButton({ children, redirectPath = null }) {
  function handleClick() {
    if (redirectPath) {
      redirect(redirectPath);
    } else {
      router.back();
    }
  }

  const router = useRouter();

  return <button onClick={handleClick}>{children}</button>;
}
