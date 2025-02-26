import { notFound } from "next/navigation";
import { supabase } from "./supabase";

export const getCategoryIdByName = async function (categoryName, userId) {
  const { data, error } = await supabase
    .from("categories")
    .select("id")
    .eq("name", categoryName)
    .or(`userId.eq.${userId},userId.is.null`, { foreignTable: null })
    .single();

  if (error) {
    console.error(error);
    throw new Error("Cannot load categories info to find shares");
  }

  return data;
};

export const getSharesByCategoryName = async function (categoryName, userId) {
  const catId = await getCategoryIdByName(categoryName, userId);

  const { data, error } = await supabase
    .from("shares")
    .select("email")
    .eq("userId", userId)
    .eq("categoryId", catId.id);

  if (error) {
    console.error(error);
    throw new Error("Cannot load shares");
  }

  return data;
};

//Test function to get all Categories
export const getCategories = async function (userId) {
  const { data, error } = await supabase
    .from("categories")
    .select("name, id")
    .or(`userId.eq.${userId},userId.is.null`, { foreignTable: null });

  if (error) {
    console.error(error);
    throw new Error("Shopping categories could not be loaded");
  }

  return data;
};

//Get a category list with details of all categories user have items in
export const getActiveCategories = async function (categories) {
  const { data, error } = await supabase
    .from("categories")
    .select("id,name")
    .in("id", categories);

  if (error) {
    console.log(error);
    throw new Error("Category details could not be loaded");
  }

  return data;
};

//Load all items for a certain user
export const getUserItems = async function (userId) {
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("userId", userId);

  if (error) {
    throw new Error(`Shopping items for user ${userId} cannot be loaded`);
  }

  return data;
};

export const getSharedItems = async function (userId, email) {
  const { data, error } = await supabase
    .from("shares")
    .select("*")
    .eq("email", email);

  if (error) {
    throw new Error(`Sharing information cannot be retrieved: ${error}`);
  }

  if (data.length === 0 || data === null) return [];

  //If there are shares, extract all items

  const { data: dataItems, error: errorItems } = await supabase
    .from("items")
    .select("*")
    .in(
      "userId",
      data.map((el) => el.userId)
    );

  if (errorItems) {
    throw new Error(`Cannot retrieve shared items: ${errorItems}`);
  }

  if (dataItems.length === 0 || dataItems === null) return [];

  const sharedCategories = data.map((el) => el.categoryId);
  const sharedItems = dataItems.filter((item) =>
    sharedCategories.includes(item.categoryId)
  );

  return sharedItems;
};

//Load all items with given fileId
export const getItemsByFileId = async function (fileId, userId) {
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("fileId", fileId)
    .eq("userId", userId);

  if (error) {
    throw new Error(
      `Shopping items for fileId ${fileId} cannot be found/loaded`
    );
  }

  return data;
};

//Load all items with given categoryName for given UserId
export const getItemsByCategoryName = async function (categoryName, userId) {
  const categories = await getCategories(userId);
  const category = categories.find((el) => el.name === categoryName);

  if (!category) {
    notFound();
  }

  const { data, error } = await supabase
    .from("items")
    .select("*, categories(id, name)")
    .eq("categoryId", category.id)
    .eq("userId", userId);

  if (error) {
    throw new Error(
      `Shopping items for ${categoryName} cannot be found/loaded`
    );
  }

  return data;
};

// All users are uniquely identified by their email address (logged in)
export async function getUser(email) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no user in the sign in callback
  return data;
}

export async function createUser(newUser) {
  const { data, error } = await supabase
    .from("users")
    .insert([newUser])
    .select();

  if (error) {
    console.error(error);
    throw new Error("A new user could not be created");
  }

  return data;
}
