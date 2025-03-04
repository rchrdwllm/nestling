"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const getCurrentUser = async () => {
  const user = await getServerSession(authOptions);

  return user?.user;
};

export const getOptimisticUser = async () => {
  const user = await getServerSession(authOptions);

  return user!.user!;
};
