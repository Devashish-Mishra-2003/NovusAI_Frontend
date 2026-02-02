import { api } from "./client";

export async function uploadDocument(file: File) {
  const form = new FormData();
  form.append("file", file);

  const res = await api.post("/api/documents/upload", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data as {
    message: string;
    path: string;
    filename: string;
  };
}

