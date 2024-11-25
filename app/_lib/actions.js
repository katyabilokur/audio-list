"use server";

import { auth, signIn, signOut } from "./auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/home" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
