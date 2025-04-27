"use server";

import { CloudinaryFile, CloudinaryImage } from "@/types";

export const uploadImgToCloudinary = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "nestling");

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/nestling-lan/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = (await res.json()) as CloudinaryImage;

    return { success: data };
  } catch (error) {
    console.error("Image upload failed:", error);

    return { error };
  }
};

export const uploadFileToCloudinary = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "nestling");
  formData.append("resource_type", "auto");

  if (file.type === "application/pdf") {
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/nestling-lan/raw/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = (await res.json()) as CloudinaryFile;

      return { success: data };
    } catch (error) {
      console.error("File upload failed:", error);

      return { error };
    }
  }

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/nestling-lan/auto/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = (await res.json()) as CloudinaryFile;

    return { success: data };
  } catch (error) {
    console.error("File upload failed:", error);

    return { error };
  }
};
