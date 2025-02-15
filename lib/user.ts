"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const getCurrentUser = async () => {
  const user = await getServerSession(authOptions);

  return user?.user;
};
