"use server";

import { LoginSchema } from "@/schemas/LoginSchema";
import { db } from "@/lib/firebase";
import { User } from "@/types";
import bcrypt from "bcrypt";
import * as z from "zod";

export const checkEmailLogin = async (data: z.infer<typeof LoginSchema>) => {
  const { email, password } = data;

  try {
    const usersRef = db.collection("users").where("email", "==", email);
    const users = await usersRef.get();

    if (users.empty) {
      return { error: "User not found" };
    }

    const user = users.docs[0].data() as User;

    if (user.isArchived) {
      return { error: "User account is archived" };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { error: "Incorrect password" };
    }

    user.updatedAt = JSON.stringify(user.updatedAt);
    user.createdAt = JSON.stringify(user.createdAt);

    return { success: user };
  } catch (error) {
    return { error };
  }
};
