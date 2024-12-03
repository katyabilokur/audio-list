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

  console.log(data.publicUrl);
  return data.publicUrl;
}
