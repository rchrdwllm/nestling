"use server";

import { RegisterSchema } from "@/schemas/RegisterSchema";
import { db } from "@/lib/firebase";
import bcrypt from "bcrypt";
import { signIn } from "next-auth/react";
import * as z from "zod";
import { Timestamp } from "firebase-admin/firestore";

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
  } = data;

  try {
    const usersRef = db.collection("users").where("email", "==", email);
    const users = await usersRef.get();

    if (!users.empty) {
      return { error: "User already exists" };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const id = crypto.randomUUID();

    const newUser = {
      email,
      password: hashedPassword,
      role,
      image: null,
      id,
      firstName,
      middleName,
      lastName,
      contactNumber,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("users").doc(id).set(newUser);

    return { success: newUser };
  } catch (error) {
    return { error: error };
  }
};
