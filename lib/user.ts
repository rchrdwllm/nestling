"use server";

import { auth } from "@/auth";

export const getCurrentUser = async () => {
  const user = await auth();

  return user!.user;
};
