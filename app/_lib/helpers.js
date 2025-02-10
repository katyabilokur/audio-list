export async function uploadFileToStorage(audioBlob, userId) {
  const formData = new FormData();
  formData.append("file", audioBlob);
  formData.append("userId", userId);

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

export async function deleteFileFromStorage(url) {
  const urlFile = url.split("/").at(-1);

  const response = await fetch("/api/delete-audio", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ urlFile }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("File deletion failed:", data.error || "Unknown error");
  }

  return;
}

export async function transcribeAudio(publicUrl) {
  const response = await fetch("/api/transcribe-audio", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ audioUrl: publicUrl }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Transcription failed:", data.error || "Unknown error");
  }

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

export async function insertNewItems(csvItemsText, userId, urlId) {
  const response = await fetch("/api/insert-items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ csvItemsText, userId, urlId }),
  });

  if (!response.ok) {
    throw new Error("Failed to insert items");
  }

  const result = await response.json();

  return result.data;
}
