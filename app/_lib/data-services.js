import { supabase } from "./supabase";

export const getCategories = async function () {
  const { data, error } = await supabase.from("categories").select();

  if (error) {
    console.error(error);
    throw new Error("Shopping categories could not be loaded");
  }

  return data;
};
