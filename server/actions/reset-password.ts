"use server";

import { NewPasswordSchema } from "@/schemas/NewPasswordSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { User } from "@/types";
import bcrypt from "bcrypt";

export const resetPassword = actionClient
  .schema(NewPasswordSchema)
  .action(async ({ parsedInput }) => {
    const { password, email } = parsedInput;

    try {
      const userRef = db.collection("users").where("email", "==", email);
      const userSnapshot = await userRef.get();
      const userDoc = userSnapshot.docs[0].data() as User;

      if (userSnapshot.empty) {
        return { error: "User not found" };
      }

      const isSameBefore = await bcrypt.compare(password, userDoc.password);

      if (isSameBefore) {
        return { error: "Passwords must not be the same as before" };
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      await db.collection("users").doc(userDoc.id).update({
        password: hashedPassword,
      });

      return { success: "Password reset successfully" };
    } catch (error) {
      return { error };
    }
  });
