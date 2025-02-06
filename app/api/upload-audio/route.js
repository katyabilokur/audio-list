import { supabase } from "@/app/_lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse form data from the incoming request
    const formData = await req.formData();
    const file = formData.get("file");
    const userId = formData.get("userId");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert the file to an array buffer
    const buffer = await file.arrayBuffer();
    const fileName = `${userId}-audio-${Date.now()}.webm`;

    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage
      .from("audio-files")
      .upload(fileName, new Blob([buffer]), {
        cacheControl: "3600",
        upsert: false, // Prevent overwriting files with the same name
      });

    if (error) {
      console.error("Error uploading file:", error);
      return NextResponse.json(
        { error: "File upload failed" },
        { status: 500 }
      );
    }

    // Generate a public URL for the uploaded file
    const { data: publicUrl, error: publicUrlError } = supabase.storage
      .from("audio-files")
      .getPublicUrl(fileName);

    if (publicUrlError) {
      return NextResponse.json(
        {
          error: "Failed to generate public URL",
          details: publicUrlError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ publicUrl });
  } catch (error) {
    console.error("Error handling file upload:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
