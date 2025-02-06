import { supabase } from "@/app/_lib/supabase";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { urlFile } = await req.json();

    const { data, error } = await supabase.storage
      .from("audio-files")
      .remove([urlFile]);

    if (error) {
      console.error("Error removing a file from the storage bucket:", error);
      return NextResponse.json(
        { error: "File delete failed" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error handling file removal:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
