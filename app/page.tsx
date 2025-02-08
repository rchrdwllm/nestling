import { auth } from "@/auth";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await auth();

  if (!session) return redirect("/login");

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
