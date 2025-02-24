import { getCategories } from "@/app/_lib/data-services";
import { mapCategories } from "@/app/_lib/dataHelpers";
import { supabase } from "@/app/_lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { csvItemsText, userId, urlId } = await request.json();

  const categoriesList = await getCategories(userId);
  const categories = mapCategories(categoriesList, false);

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
      fileId: urlId,
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

export async function DELETE(req) {
  const { itemIds } = await req.json();

  const { error } = await supabase.from("items").delete().in("id", itemIds);

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete items" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Bought items successfully removed from to buy list" },
    { status: 200 }
  );
}
