import { supabase } from "./supabase";

export const getCategories = async function () {
  const { data, error } = await supabase.from("categories").select();

  if (error) {
    console.error(error);
    throw new Error("Shopping categories could not be loaded");
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
