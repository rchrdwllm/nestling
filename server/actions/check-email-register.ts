"use server";

import { RegisterSchema } from "@/schemas/RegisterSchema";
import { db } from "@/lib/firebase";
import bcrypt from "bcrypt";
import * as z from "zod";
import { encryptData } from "@/lib/aes";

export const checkEmailRegister = async (
  data: z.infer<typeof RegisterSchema>
) => {
  const {
    email,
    password,
    role,
    firstName,
    middleName,
    lastName,
    contactNumber,
    address,
  } = data;

  try {
    const usersRef = db.collection("users").where("email", "==", email);
    const users = await usersRef.get();

    if (!users.empty) {
      return { error: "User already exists" };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const id = crypto.randomUUID();
    const aesKey = process.env.AES_ENCRYPTION_KEY;

    if (!aesKey) {
      return {
        error:
          "Failed to encrypt user information. AES encryption key not found.",
      };
    }

    const newUser = {
      email,
      password: hashedPassword,
      role,
      image: null,
      id,
      firstName,
      middleName,
      lastName,
      contactNumber: encryptData(contactNumber, aesKey),
      address: encryptData(address, aesKey),
      name: `${firstName} ${middleName} ${lastName}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notifsEnabled: false,
    };

    await db.collection("users").doc(id).set(newUser);

    return { success: newUser };
  } catch (error) {
    return { error: error };
  }
};
