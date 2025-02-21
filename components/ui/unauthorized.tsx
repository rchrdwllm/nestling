import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "./button";
import { getCurrentUser } from "@/lib/user";
import { useCurrentUser } from "@/hooks/use-current-user";

const Unauthorized = () => {
  const { user } = useCurrentUser();

  let redirectLink = "/dashboard";

  if (!user) {
    return redirect("/api/auth/signin");
  }

  if (user.role === "student") {
    redirectLink = "/student-dashboard";
  }

  if (user.role === "instructor") {
    redirectLink = "/instructor-dashboard";
  }

  if (user.role === "admin") {
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
