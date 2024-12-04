export async function uploadFileToStorage(audioBlob) {
  const formData = new FormData();
  formData.append("file", audioBlob);

  const response = await fetch("/api/upload-audio", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("File upload failed:", data.error);
  }

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

  const data = await response.json();

  if (!response.ok) {
    console.error("Transcription failed:", data.error || "Unknown error");
  }

  return data;
}
