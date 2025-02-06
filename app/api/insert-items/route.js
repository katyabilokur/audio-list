import { getCategories } from "@/app/_lib/data-services";
import { supabase } from "@/app/_lib/supabase";

export async function POST(request) {
  const { csvItemsText, userId } = await request.json();

  //Create new item list from csv text
  const categoriesList = await getCategories(userId);

  const categories = new Map();

  categoriesList.forEach((catEl) => categories.set(catEl.name, catEl.id));

  let newItems = [];
  const csvItems = csvItemsText.split("\n");
  csvItems.forEach((csvItem) => {
    const itemRow = csvItem.split(",");
    newItems.push({
      userId: userId,
      categoryId: categories.get(itemRow[0]),
      quantity: itemRow[1] !== "" ? itemRow[1] : null,
      unit: itemRow[2],
      name: itemRow[3],
      note: itemRow[4],
    });
  });

  const { data, error } = await supabase
    .from("items")
    .insert(newItems)
    .select();

  if (error) {
    console.error(error);
    return new Response(
      { error: `New recorder items cannot be inserted: ${error}` },
      {
        status: 500,
      }
    );
  }

  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
