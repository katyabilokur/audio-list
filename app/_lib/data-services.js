import { supabase } from "./supabase";

//Test function to get all Categories
export const getCategories = async function () {
  const { data, error } = await supabase.from("categories").select();

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
