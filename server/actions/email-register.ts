"use server";

import { RegisterSchema } from "@/schemas/RegisterSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import bcrypt from "bcrypt";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const emailRegister = actionClient
  .schema(RegisterSchema)
  .action(async ({ parsedInput }) => {
    const {
      email,
      password,
      confirmPassword,
      role,
      firstName,
      middleName,
      lastName,
      contactNumber,
    } = parsedInput;
    let urlPath = "/";

    try {
      const usersRef = db.collection("users").where("email", "==", email);
      const users = await usersRef.get();

      if (!users.empty) {
        throw new Error("User already exists");
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const id = crypto.randomUUID();

      await db.collection("users").add({
        email,
        password: hashedPassword,
        role,
        image: null,
        id,
        firstName,
        middleName,
        lastName,
        contactNumber,
      });

      try {
        await signIn("credentials", {
          email,
          password,
          confirmPassword,
          role,
          firstName,
          middleName,
          lastName,
          contactNumber,
          redirectTo: "/",
          redirect: false,
        });

        urlPath = `/${role}-dashboard`;
      } catch (error) {
        if (error instanceof AuthError) {
          switch (error.type) {
            case "CredentialsSignin":
              return "Invalid credentials.";
            default:
              return "Something went wrong.";
          }
        }

        urlPath = "/register";

        throw error;
      }
    } catch (error) {
      return { error: error };
    } finally {
      redirect(urlPath);
    }
  });
