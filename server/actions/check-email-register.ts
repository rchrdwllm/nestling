"use server";

import { RegisterSchema } from "@/schemas/RegisterSchema";
import { db } from "@/lib/firebase";
import bcrypt from "bcrypt";
import * as z from "zod";
import { encryptData } from "@/lib/aes";
import { getRegisteredEmail } from "@/lib/registered-email";
import { revalidateTag } from "next/cache";

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
    // const { success: registeredEmail, error: emailError } =
    //   await getRegisteredEmail(email);

    // if (emailError || !registeredEmail) {
    //   return { error: "This email has not yet been validated by Leave a Nest" };
    // }

    // if (registeredEmail.role !== role) {
    //   return {
    //     error: `Role mismatch. Registered email in system is for ${registeredEmail.role}, but provided role is ${role}.`,
    //   };
    // }

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
    await db.collection("registeredEmails").doc(email).delete();

    revalidateTag("users");
    revalidateTag("registeredEmails");

    return { success: newUser };
  } catch (error) {
    return { error: error };
  }
};
