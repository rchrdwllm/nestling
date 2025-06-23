"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { unstable_cache } from "next/cache";
import { db } from "./firebase";
import { User } from "@/types";
import { decryptData } from "./aes";

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
    console.log(
      `[${new Date().toISOString()}] getUserById called for userId=${userId}`
    );
    try {
      const userSnapshot = await db.collection("users").doc(userId).get();

      if (!userSnapshot.exists) {
        return { error: "User not found" };
      }

      const user = userSnapshot.data() as User;
      const aesKey = process.env.AES_ENCRYPTION_KEY;

      if (!aesKey) {
        return {
          error:
            "Failed to decrypt user information. AES encryption key not found.",
        };
      }

      return {
        success: {
          ...user,
          contactNumber: decryptData(user.contactNumber, aesKey),
          address: decryptData(user.address, aesKey),
        },
      };
    } catch (error) {
      console.error(error);

      return { error: JSON.stringify(error) };
    }
  },
  ["userId"],
  { revalidate: 60 * 60 * 24, tags: ["user"] }
);

export const getUnarchivedStudents = unstable_cache(
  async () => {
    console.log(`[${new Date().toISOString()}] getUnarchivedStudents called`);
    try {
      const usersSnapshot = await db
        .collection("users")
        .where("role", "==", "student")
        .where("isArchived", "==", false)
        .get();
      const aesKey = process.env.AES_ENCRYPTION_KEY;

      if (!aesKey) {
        return {
          error:
            "Failed to decrypt user information. AES encryption key not found.",
        };
      }

      const users = usersSnapshot.docs.map((doc) => ({
        ...doc.data(),
        contactNumber: decryptData(doc.data().contactNumber, aesKey),
        address: decryptData(doc.data().address, aesKey),
      })) as User[];

      return { success: users };
    } catch (error) {
      console.error(error);

      return { error: JSON.stringify(error) };
    }
  },
  ["allStudents"],
  { revalidate: 60 * 60 * 24, tags: ["user", "students"] }
);

export const getUnarchivedInstructors = unstable_cache(
  async () => {
    console.log(
      `[${new Date().toISOString()}] getUnarchivedInstructors called`
    );
    try {
      const usersSnapshot = await db
        .collection("users")
        .where("role", "==", "instructor")
        .where("isArchived", "==", false)
        .get();
      const aesKey = process.env.AES_ENCRYPTION_KEY;

      if (!aesKey) {
        return {
          error:
            "Failed to decrypt user information. AES encryption key not found.",
        };
      }

      const users = usersSnapshot.docs.map((doc) => ({
        ...doc.data(),
        contactNumber: decryptData(doc.data().contactNumber, aesKey),
        address: decryptData(doc.data().address, aesKey),
      })) as User[];

      return { success: users };
    } catch (error) {
      console.error(error);

      return { error: JSON.stringify(error) };
    }
  },
  ["allInstructors"],
  { revalidate: 60 * 60 * 24, tags: ["user", "instructors"] }
);

export const getUnarchivedAdmins = unstable_cache(
  async () => {
    console.log(`[${new Date().toISOString()}] getUnarchivedAdmins called`);
    try {
      const usersSnapshot = await db
        .collection("users")
        .where("role", "==", "admin")
        .where("isArchived", "==", false)
        .get();
      const aesKey = process.env.AES_ENCRYPTION_KEY;

      if (!aesKey) {
        return {
          error:
            "Failed to decrypt user information. AES encryption key not found.",
        };
      }

      const users = usersSnapshot.docs.map((doc) => ({
        ...doc.data(),
        contactNumber: decryptData(doc.data().contactNumber, aesKey),
        address: decryptData(doc.data().address, aesKey),
      })) as User[];

      return { success: users };
    } catch (error) {
      console.error(error);

      return { error: JSON.stringify(error) };
    }
  },
  ["allAdmins"],
  { revalidate: 60 * 60 * 24, tags: ["user", "admins"] }
);

export const getAllStudents = unstable_cache(
  async () => {
    console.log(`[${new Date().toISOString()}] getAllStudents called`);
    try {
      const usersSnapshot = await db
        .collection("users")
        .where("role", "==", "student")
        .get();
      const aesKey = process.env.AES_ENCRYPTION_KEY;

      if (!aesKey) {
        return {
          error:
            "Failed to decrypt user information. AES encryption key not found.",
        };
      }

      const users = usersSnapshot.docs.map((doc) => ({
        ...doc.data(),
        contactNumber: decryptData(doc.data().contactNumber, aesKey),
        address: decryptData(doc.data().address, aesKey),
      })) as User[];

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
    console.log(`[${new Date().toISOString()}] getAllInstructors called`);
    try {
      const usersSnapshot = await db
        .collection("users")
        .where("role", "==", "instructor")
        .get();
      const aesKey = process.env.AES_ENCRYPTION_KEY;

      if (!aesKey) {
        return {
          error:
            "Failed to decrypt user information. AES encryption key not found.",
        };
      }

      const users = usersSnapshot.docs.map((doc) => ({
        ...doc.data(),
        contactNumber: decryptData(doc.data().contactNumber, aesKey),
        address: decryptData(doc.data().address, aesKey),
      })) as User[];

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
    console.log(`[${new Date().toISOString()}] getAllAdmins called`);
    try {
      const usersSnapshot = await db
        .collection("users")
        .where("role", "==", "admin")
        .get();
      const aesKey = process.env.AES_ENCRYPTION_KEY;

      if (!aesKey) {
        return {
          error:
            "Failed to decrypt user information. AES encryption key not found.",
        };
      }

      const users = usersSnapshot.docs.map((doc) => ({
        ...doc.data(),
        contactNumber: decryptData(doc.data().contactNumber, aesKey),
        address: decryptData(doc.data().address, aesKey),
      })) as User[];

      return { success: users };
    } catch (error) {
      console.error(error);

      return { error: JSON.stringify(error) };
    }
  },
  ["allAdmins"],
  { revalidate: 60 * 60 * 24, tags: ["user", "admins"] }
);
