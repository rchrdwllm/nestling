import { getCurrentUser, getUserById } from "@/lib/user";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const UserCheckWrapper = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();

  if (!user) {
    console.error("No session found, redirecting to login...");

    return redirect("/api/auth/signin");
  }

  const { success: dbUser, error } = await getUserById(user.id);

  if (error || !dbUser) {
    console.error("User not found, redirecting to login...");

    return redirect("/api/auth/signin");
  }

  return <>{children}</>;
};

export default UserCheckWrapper;
