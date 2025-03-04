"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { unstable_cache } from "next/cache";
import { db } from "./firebase";
import { User } from "@/types";

export const getCurrentUser = async () => {
  const user = await getServerSession(authOptions);

  return user?.user;
};

export const getOptimisticUser = async () => {
  const user = await getServerSession(authOptions);

  return user!.user!;
};

export const getUserById = unstable_cache(async (userId: string) => {
  try {
    const userSnapshot = await db.collection("users").doc(userId).get();

    if (!userSnapshot.exists) {
      return { error: "User not found" };
    }

    const user = userSnapshot.data() as User;

    return { success: user };
  } catch (error) {
    console.error(error);

    return { error: JSON.stringify(error) };
  }
});
