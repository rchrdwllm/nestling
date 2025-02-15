"use server";

import { ResetPasswordSchema } from "@/schemas/ResetPasswordSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { generatePasswordResetToken } from "./generate-tokens";
import { sendPasswordResetToken } from "./send-to-email";

export const emailResetToken = actionClient
  .schema(ResetPasswordSchema)
  .action(async ({ parsedInput }) => {
    const { email } = parsedInput;

    try {
      const usersRef = db.collection("users").where("email", "==", email);
      const users = await usersRef.get();

      if (users.empty) {
        return { error: "No user found with that email" };
      }

      const { success, error } = await generatePasswordResetToken(email);

      if (error) {
        return { error };
      }

      if (success) {
        const { error } = await sendPasswordResetToken(email, success.token);

        if (error) {
          return { error };
        }

        return { success: "Reset link sent! Please check your email" };
      }
    } catch (error) {
      return { error };
    }
  });
