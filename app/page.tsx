import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/api/auth/signin");

  if (session.user.role === "student") {
    return redirect("/student-dashboard");
  }

  if (session.user.role === "instructor") {
    return redirect("/instructor-dashboard");
  }

  if (session.user.role === "admin") {
    return redirect("/admin-dashboard");
  }
};

export default HomePage;
