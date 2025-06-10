"use server";

import { RegisterEmailSchema } from "@/schemas/RegisterEmailSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidateTag } from "next/cache";

export const registerEmail = actionClient
  .schema(RegisterEmailSchema)
  .action(async ({ parsedInput }) => {
    const { email, role } = parsedInput;

    try {
      const existingEmailSnapshot = await db
        .collection("registeredEmails")
        .doc(email)
        .get();

      if (existingEmailSnapshot.exists) {
        return { error: "Email is already registered" };
      }

      const existingUserSnapshot = await db
        .collection("users")
        .where("email", "==", email)
        .get();

      if (!existingUserSnapshot.empty) {
        return { error: "Email is already in use" };
      }

      await db.collection("registeredEmails").doc(email).set({
        email,
        role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      revalidateTag("registeredEmails");

      return { success: "Person registered successfully" };
    } catch (error) {
      console.error("Error registering people:", error);

      return { error };
    }
  });
