import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/api/auth/signin");

  return redirect("/dashboard");
};

export default HomePage;
