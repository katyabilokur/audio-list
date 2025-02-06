export async function uploadFileToStorage(audioBlob) {
  const formData = new FormData();
  formData.append("file", audioBlob);

  const response = await fetch("/api/upload-audio", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    console.error("File upload failed:", data.error);
  }

  const data = await response.json();

  return data.publicUrl;
}

export async function transcribeAudio(publicUrl) {
  const response = await fetch("/api/transcribe-audio", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ audioUrl: publicUrl }),
  });

  if (!response.ok) {
    console.error("Transcription failed:", data.error || "Unknown error");
  }

  const data = await response.json();

  return data;
}

export async function structureText(text, userId) {
  const response = await fetch("/api/structure-text", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, userId }),
  });

  if (!response.ok) {
    throw new Error("Failed to process the text");
  }

  const data = await response.json();

  return data.csv;
}

export async function insertNewItems(csvItemsText, userId) {
  const response = await fetch("/api/insert-items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ csvItemsText, userId }),
  });

  if (!response.ok) {
    throw new Error("Failed to insert items");
  }

  const result = await response.json();

  return result.data;
}
