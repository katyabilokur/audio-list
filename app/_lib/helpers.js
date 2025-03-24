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

export async function transcribeAudio(publicUrl, language) {
  const response = await fetch("/api/transcribe-audio", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ audioUrl: publicUrl, language }),
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
  const response = await fetch("/api/items", {
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

export async function deleteItems(itemIds) {
  const response = await fetch("/api/items", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ itemIds }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete items");
  }

  await response.json();

  return;
}

//add = true is to add an item, false is to remove the item
export async function updateCartItem(categoryId, itemId, add = true) {
  const response = await fetch("/api/update-cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ categoryId, itemId, add }),
  });

  if (!response.ok) {
    throw new Error("Failed to update Cart");
  }

  const result = await response.json();

  return result.data;
}
