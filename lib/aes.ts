import CryptoJS from "crypto-js";

export const encryptData = (data: string, key: string): string => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify({ data }),
    key
  ).toString();

  return encrypted;
};

export const decryptData = (encryptedData: string, key: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, key).toString(
    CryptoJS.enc.Utf8
  );
  const { data } = JSON.parse(bytes);
  const decrypted = data || "";

  if (!decrypted) {
    throw new Error("Decryption failed or data is empty");
  }

  return decrypted;
};
