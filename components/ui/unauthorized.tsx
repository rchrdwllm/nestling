import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "./button";

const Unauthorized = async () => {
  const session = await auth();
  let redirectLink = "/dashboard";

  if (!session) {
    return redirect("/login");
  }

  if (session.user.role === "student") {
    redirectLink = "/student-dashboard";
  }

  if (session.user.role === "instructor") {
    redirectLink = "/instructor-dashboard";
  }

  if (session.user.role === "admin") {
    redirectLink = "/admin-dashboard";
  }

  return (
    <section className="h-screen flex justify-center items-center">
      <p>
        Whoops! You are unauthorized to access this page. Click{" "}
        <Link href={redirectLink}>
          <Button className="p-0" variant="link">
            here
          </Button>
        </Link>{" "}
        to go back to your content.
      </p>
    </section>
  );
};

export default Unauthorized;
