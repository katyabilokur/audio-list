import { NextResponse } from "next/server";
import { AssemblyAI } from "assemblyai";

export async function POST(request) {
  const { audioUrl } = await request.json();

  if (!audioUrl) {
    return NextResponse.json(
      { error: "No audio URL provided" },
      { status: 400 }
    );
  }

  const client = new AssemblyAI({
    apiKey: process.env.ASSEMBLYAI_API_KEY,
  });

  const params = {
    audio: audioUrl,
  };

  const transcript = await client.transcripts.transcribe(params);

  if (transcript.status === "error") {
    console.error(`Transcription failed: ${transcript.error}`);
    return NextResponse.json(
      {
        error: `Transcription request failed with error: ${transcript.error}`,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(transcript.text);
}
