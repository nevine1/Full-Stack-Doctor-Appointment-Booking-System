const uploadFile = async (file, token) => {
  const formData = new FormData();
  formData.append("file", file);

  const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const res = await fetch(`${backUrl}/api/uploads`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text(); // avoid JSON parsing on HTML
    console.error("Upload failed:", errorText);
    throw new Error("File upload failed: " + res.status);
  }

  const data = await res.json();

  return `${backUrl}${data.filePath}`;
};

export default uploadFile;
