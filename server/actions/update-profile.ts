"use server";

import { UpdateProfileSchema } from "@/schemas/UpdateProfileSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { User } from "@/types";
import bcrypt from "bcrypt";
import { revalidatePath, revalidateTag } from "next/cache";
import { logUserActivity } from "./log-user-activity";

export const updateProfile = actionClient
  .schema(UpdateProfileSchema)
  .action(async ({ parsedInput }) => {
    try {
      const userRef = db.collection("users").doc(parsedInput.userId);
      const userSnapshot = await userRef.get();
      const user = userSnapshot.data() as User;

      if (!userRef) {
        return { error: "User not found" };
      }

      const updates = {
        contactNumber: parsedInput.contactNumber,
        email: parsedInput.email,
        firstName: parsedInput.firstName,
        image: parsedInput.image ?? null,
        lastName: parsedInput.lastName,
        middleName: parsedInput.middleName,
      };

      if (parsedInput.newPassword && parsedInput.currentPassword) {
        const passwordMatch = await bcrypt.compare(
          parsedInput.currentPassword,
          user.password
        );

        if (!passwordMatch) {
          return { error: "Incorrect password" };
        }

        const hashedPassword = await bcrypt.hash(parsedInput.newPassword, 10);

        await userRef.update({
          ...updates,
          password: hashedPassword,
        });

        await logUserActivity({
          userId: parsedInput.userId,
          type: "update_profile",
        });

        revalidatePath("/profile", "page");
        revalidateTag("user");

        return { success: "Profile updated" };
      }

      await userRef.update({
        ...updates,
      });

      await logUserActivity({
        userId: parsedInput.userId,
        type: "update_profile",
      });

      revalidatePath("/profile", "page");
      revalidateTag("user");

      return { success: "Profile updated" };
    } catch (error) {
      console.error(error);

      return { error };
    }
  });
