"use server";

import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { getCategories, getCategoryIdByName } from "./data-services";
import { mapCategories } from "./dataHelpers";
import { supabase } from "./supabase";
import { z } from "zod";
import sendInviteEmail from "../_components/emails/inviteEmail";

export async function signInAction() {
  await signIn("google", { redirectTo: "/home" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function clearCategoryItems(items) {
  const session = await auth();
  const userId = session?.user.userId;

  //Check and filter all items that user can delete to eliminate unauthorised action
  const validIdsToDeleted = items
    .filter((item) => item.userId === userId)
    .map((el) => el.id);

  const { error } = await supabase
    .from("items")
    .delete()
    .in("id", validIdsToDeleted);

  if (error) {
    console.error(`Error deleting items records: `, error);
  }

  redirect("/home");
}

const shareListSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function shareList(formData) {
  const session = await auth();
  const userId = session?.user.userId;

  if (!userId) {
    return { error: "Unauthorized access" };
  }

  const email = formData.get("email");
  const categoryName = formData.get("categoryName");
  //TODO: BUG: potential safety leak. Do not take from form, but check in the DB. If more than maxSharesNumber shares, reject sharing.
  const existingShares = JSON.parse(formData.get("existingShares"));

  if (existingShares.includes(email)) {
    return { success: true };
  }

  const catId = await getCategoryIdByName(categoryName, userId);

  if (!catId) {
    return { error: "Category not found" };
  }

  const validationResult = shareListSchema.safeParse({ email });

  if (!validationResult.success) {
    return { error: "Invalid email address" };
  }

  const { data, error } = await supabase
    .from("shares")
    .insert([{ userId: userId, categoryId: catId.id, email }])
    .select();

  if (error) {
    console.error(`Cannot save sharing information`, error);
    return { success: false, error: "Failed to share the list." };
  }

  await sendInviteEmail(email, categoryName);

  return { success: true };
}

export async function updateListItems(formData) {
  const session = await auth();
  const userId = session?.user.userId;

  //1. Create an object with form data
  const categoriesList = await getCategories(userId);
  const categoriesMap = mapCategories(categoriesList, false);

  const ids = formData.getAll("itemId");
  const categories = formData.getAll("category");
  const quantity = formData.getAll("quantity");
  const unit = formData.getAll("unit");
  const name = formData.getAll("name");
  const note = formData.getAll("note");

  const removedIds = JSON.parse(formData.get("removedIds") || "[]");

  let updatedItems = [];
  for (let i = 0; i < ids.length; i++) {
    updatedItems.push({
      id: +ids[i],
      categoryId: categoriesMap.get(categories[i]),
      quantity: +quantity[i],
      unit: unit[i],
      name: name[i],
      note: note[i],
    });
  }

  //NOTE: we need to update the DB anyway, to clear fileId field, as these records can not be changed in this way anymore
  //2. Update record in the DB
  //NOTE: by making additional filter by userId we make sure the valid user is updating the record
  for (const item of updatedItems) {
    const { data, error } = await supabase
      .from("items")
      .update({
        categoryId: item.categoryId,
        quantity: item.quantity,
        unit: item.unit,
        name: item.name,
        note: item.note,
        fileId: "",
      })
      .eq("id", item.id)
      .eq("userId", userId);

    if (error) {
      console.error(`Error updating record with ID ${item.id}:`, error);
    }
  }

  //If there are rows to be removed from the DB, do it
  if (removedIds.length > 0) {
    await supabase.from("items").delete().in("id", removedIds);
  }

  //TODO: see if anything needs to be revalidated
  // revalidatePath("/account/reservations");

  redirect("/home");
}
