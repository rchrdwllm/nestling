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

export const getUserById = unstable_cache(
  async (userId: string) => {
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
  },
  ["userId"],
  { revalidate: 60 * 60 * 24, tags: ["user"] }
);

export const getAllStudents = unstable_cache(
  async () => {
    try {
      const usersSnapshot = await db
        .collection("users")
        .where("role", "==", "student")
        .get();
      const users = usersSnapshot.docs.map((doc) => doc.data()) as User[];

      return { success: users };
    } catch (error) {
      console.error(error);

      return { error: JSON.stringify(error) };
    }
  },
  ["allStudents"],
  { revalidate: 60 * 60 * 24, tags: ["user", "students"] }
);

export const getAllInstructors = unstable_cache(
  async () => {
    try {
      const usersSnapshot = await db
        .collection("users")
        .where("role", "==", "instructor")
        .get();
      const users = usersSnapshot.docs.map((doc) => doc.data()) as User[];

      return { success: users };
    } catch (error) {
      console.error(error);

      return { error: JSON.stringify(error) };
    }
  },
  ["allInstructors"],
  { revalidate: 60 * 60 * 24, tags: ["user", "instructors"] }
);

export const getAllAdmins = unstable_cache(
  async () => {
    try {
      const usersSnapshot = await db
        .collection("users")
        .where("role", "==", "admin")
        .get();
      const users = usersSnapshot.docs.map((doc) => doc.data()) as User[];

      return { success: users };
    } catch (error) {
      console.error(error);

      return { error: JSON.stringify(error) };
    }
  },
  ["allAdmins"],
  { revalidate: 60 * 60 * 24, tags: ["user", "admins"] }
);
