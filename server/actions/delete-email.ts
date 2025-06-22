"use server";

import { DeleteEmailSchema } from "@/schemas/DeleteEmailSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { revalidateTag } from "next/cache";

export const deleteEmail = actionClient
  .schema(DeleteEmailSchema)
  .action(async ({ parsedInput }) => {
    const { email } = parsedInput;

    try {
      const emailSnapshot = await db
        .collection("registeredEmails")
        .doc(email)
        .get();

      if (!emailSnapshot.exists) {
        return { error: "Email not found" };
      }

      await db.collection("registeredEmails").doc(email).delete();

      revalidateTag("registeredEmails");

      return { success: "Email deleted successfully" };
    } catch (error) {
      console.error("Error deleting email: ", error);

      return { error: JSON.stringify(error) };
    }
  });
