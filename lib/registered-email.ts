"use server";

import { unstable_cache } from "next/cache";
import { db } from "./firebase";
import { RegisteredEmail } from "@/types";

export const getRegisteredEmail = unstable_cache(
  async (email: string) => {
    try {
      const registeredEmailSnapshot = await db
        .collection("registeredEmails")
        .doc(email)
        .get();

      if (!registeredEmailSnapshot.exists) {
        return { error: "Email not found" };
      }

      const registeredEmail = registeredEmailSnapshot.data() as RegisteredEmail;

      return { success: registeredEmail };
    } catch (error) {
      console.error("Error fetching registered email: ", error);

      return { error };
    }
  },
  ["email"],
  { revalidate: 60 * 60, tags: ["registeredEmails"] }
);

export const getRegisteredEmails = unstable_cache(
  async () => {
    try {
      const registeredEmailsSnapshot = await db
        .collection("registeredEmails")
        .get();
      const registeredEmails = registeredEmailsSnapshot.docs.map((doc) =>
        doc.data()
      ) as RegisteredEmail[];

      return { success: registeredEmails };
    } catch (error) {
      console.error("Error fetching registered emails: ", error);

      return { error };
    }
  },
  ["registeredEmails"],
  { revalidate: 60 * 60, tags: ["registeredEmails"] }
);
