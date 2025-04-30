"use server";

export const getSHA256 = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

export const updateHashFromUrl = async (url: string) => {
  const res = await fetch(url);
  const blob = await res.blob();
  const hash = await getSHA256(blob as File);

  return hash;
};
