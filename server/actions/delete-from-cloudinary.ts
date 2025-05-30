"use server";

import sha1 from "sha1";

const generateSHA1 = (data: string) => {
  const sha1Signature = sha1(data);
  return sha1Signature;
};

const generateSignature = (publicId: string, apiSecret: string) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

export const deleteImgFromCloudinary = async (public_id: string) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const apiKey = process.env.CLOUDINARY_API_KEY || "677182174977128";
  const apiSecret =
    process.env.CLOUDINARY_API_SECRET! || "XAcoEtXVfXdszd2K4s_To0xdBfE";
  const signature = generateSHA1(generateSignature(public_id, apiSecret));
  const url = `https://api.cloudinary.com/v1_1/nestling-lan/image/destroy`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: apiKey,
        timestamp,
        signature,
        public_id,
      }),
    });
    const data = await res.json();

    return { success: data };
  } catch (error) {
    console.error("Image deletion failed:", error);

    return { error };
  }
};

export const deleteFileFromCloudinary = async (public_id: string) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const apiKey = process.env.CLOUDINARY_API_KEY || "677182174977128";
  const apiSecret =
    process.env.CLOUDINARY_API_SECRET! || "XAcoEtXVfXdszd2K4s_To0xdBfE";
  const signature = generateSHA1(generateSignature(public_id, apiSecret));
  const url = `https://api.cloudinary.com/v1_1/nestling-lan/raw/destroy`;

  try {
    console.log("Deleting file from Cloudinary:", public_id);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: apiKey,
        timestamp,
        signature,
        public_id,
      }),
    });
    const data = await res.json();
    console.log("File deletion response:", data);

    return { success: data };
  } catch (error) {
    console.error("File deletion failed:", error);

    return { error };
  }
};
