"use server";

import { UpdateProfileSchema } from "@/schemas/UpdateProfileSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { User } from "@/types";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

export const updateStudentProfile = actionClient
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
          user.password,
        );

        if (!passwordMatch) {
          return { error: "Incorrect password" };
        }

        const hashedPassword = await bcrypt.hash(parsedInput.newPassword, 10);

        await userRef.update({
          ...updates,
          password: hashedPassword,
        });

        revalidatePath("/profile", "page");

        return { success: "Profile updated" };
      }

      await userRef.update({
        ...updates,
      });

      revalidatePath("/profile", "page");

      return { success: "Profile updated" };
    } catch (error) {
      console.error(error);

      return { error };
    }
  });

export const updateInstructorProfile = actionClient
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
          user.password,
        );

        if (!passwordMatch) {
          return { error: "Incorrect password" };
        }

        const hashedPassword = await bcrypt.hash(parsedInput.newPassword, 10);

        await userRef.update({
          ...updates,
          password: hashedPassword,
        });

        revalidatePath("/profile", "page");
        revalidatePath("/", "layout");

        return { success: "Profile updated" };
      }

      await userRef.update({
        ...updates,
      });

      revalidatePath("/profile", "page");

      return { success: "Profile updated" };
    } catch (error) {
      console.error(error);

      return { error };
    }
  });
