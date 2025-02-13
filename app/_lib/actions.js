"use server";

import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { getCategories } from "./data-services";
import { mapCategories } from "./dataHelpers";
import { supabase } from "./supabase";

export async function signInAction() {
  await signIn("google", { redirectTo: "/home" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
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

  //TODO: see if anything needs to be revalidated
  // revalidatePath("/account/reservations");

  redirect("/home");
}
