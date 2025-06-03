import { authOptions } from "@/lib/auth";
import { getUserById } from "@/lib/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/api/auth/signin");

  const { success: user, error: userError } = await getUserById(
    session.user.id
  );

  if (userError || !user) {
    console.error("Error fetching user: ", userError);

    return redirect("/api/auth/signin");
  }

  return redirect("/dashboard");
};

export default HomePage;
