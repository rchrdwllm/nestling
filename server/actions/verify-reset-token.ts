"use server";

import { db } from "@/lib/firebase";
import { PasswordResetToken } from "@/types";

export const verifyResetToken = async (token: string) => {
  const existingTokenRef = db
    .collection("passwordResetTokens")
    .where("token", "==", token);
  const existingToken = await existingTokenRef.get();

  if (existingToken.empty) {
    return { error: "Token not found" };
  }

  const tokenData = existingToken.docs[0].data() as PasswordResetToken;

  if (tokenData.expires.toDate() < new Date()) {
    return { error: "Token expired" };
  }

  await db.collection("passwordResetTokens").doc(tokenData.token).delete();

  return { success: tokenData };
};
