"use server";

import { LoginSchema } from "@/schemas/LoginSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { User } from "@/types";
import bcrypt from "bcrypt";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export const emailLogin = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput }) => {
    const { email, password, role } = parsedInput;
    let redirectUrl = "/login";

    try {
      const usersRef = db.collection("users").where("email", "==", email);
      const users = await usersRef.get();

      if (users.empty) {
        return { error: "User not found" };
      }

      const user = users.docs[0].data() as User;

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return { error: "Incorrect password" };
      }

      if (user.role !== role) {
        return { error: "Role mismatch" };
      }

      await signIn("credentials", {
        email,
        password,
        role,
        redirectTo: "/",
        redirect: false,
      });

      redirectUrl = `/${role}-dashboard`;
    } catch (error) {
      redirectUrl = "/login";

      return { error };
    }

    return redirect(redirectUrl);
  });
