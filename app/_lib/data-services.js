import { notFound } from "next/navigation";
import { supabase } from "./supabase";
import {
  defaultCategory1,
  defaultCategory2,
  defaultCategoryFixed,
} from "./dataHelpers";

export const getCategoryIdByName = async function (categoryName, userId) {
  const { data, error } = await supabase
    .from("categories")
    .select("id")
    .eq("name", categoryName)
    .eq("userId", userId)
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

export const getCategories = async function (userId) {
  const { data, error } = await supabase
    .from("categories")
    .select("name, id")
    .eq("userId", userId);

  if (error) {
    console.error(error);
    throw new Error("Shopping categories could not be loaded");
  }

  return data;
};

export const getCategoryById = async function (categoryId) {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", categoryId)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Category details could not be loaded");
  }

  return data;
};

export const getSameCategoryItems = async function (
  userId,
  categoryId,
  categoryName,
  sharedCatIds
) {
  //Step 1 find all shared categories with the same name
  const { data, error } = await supabase
    .from("categories")
    .select("id")
    .in("id", [...sharedCatIds])
    .ilike("name", categoryName);

  if (error) {
    console.log(error);
    throw new Error("Categories could not be loaded");
  }

  //Step 2 Find own category with the same name
  const { data: dataUser, error: errorUser } = await supabase
    .from("categories")
    .select("id")
    .eq("userId", userId)
    .ilike("name", categoryName)
    .single();

  if (errorUser) {
    console.log(errorUser);
    throw new Error("User category cannot be loaded");
  }

  const uniqueCatIds = Array.from(
    new Set([...data, dataUser].map((item) => item.id))
  ).filter((el) => el !== categoryId);

  if (uniqueCatIds.length === 0) return [];

  //Step 3. If there are more categories shared, find elements
  const { data: dataItems, error: errorItems } = await supabase
    .from("items")
    .select("*")
    .in("categoryId", uniqueCatIds);

  if (errorItems) {
    throw new Error(
      `Shopping items for shared ${categoryName} cannot be loaded`
    );
  }

  return dataItems;
};

//Get a category list with details of all categories user have items in
export const getActiveCategories = async function (categories) {
  const { data, error } = await supabase
    .from("categories")
    .select("id,name")
    .in("id", categories);

  if (error) {
    console.log(error);
    throw new Error("Categories details could not be loaded");
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

  //Get shared person name
  const { data: dataName, error: errorName } = await supabase
    .from("users")
    .select("*")
    .in(
      "id",
      data.map((el) => el.userId)
    );

  if (errorName) {
    throw new Error("Cannot get shared users names");
  }

  const categorySharedNames = new Map();
  data.forEach((cat) => {
    categorySharedNames.set(
      cat.categoryId,
      dataName.find((el) => el.id === cat.userId).fullName
    );
  });

  const sharedCategories = data.map((el) => el.categoryId);
  const sharedItems = dataItems.filter((item) =>
    sharedCategories.includes(item.categoryId)
  );

  return { sharedItems, categorySharedNames };
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

  //Create new set of categories for a new user
  const { data: dataCat, error: errorCat } = await supabase
    .from("categories")
    .insert([
      { name: defaultCategory1, userId: data[0].id },
      { name: defaultCategory2, userId: data[0].id },
      { name: defaultCategoryFixed, userId: data[0].id },
    ])
    .select();

  if (errorCat) {
    console.error(errorCat);
    throw new Error("Categories cannot be created for a user");
  }

  return data;
}
