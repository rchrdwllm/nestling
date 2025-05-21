import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "./button";
import { getCurrentUser } from "@/lib/user";
import { useCurrentUser } from "@/hooks/use-current-user";

const Unauthorized = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/api/auth/signin");
  }

  return (
    <section className="h-screen flex justify-center items-center">
      <p>
        Whoops! You are unauthorized to access this page. Click{" "}
        <Link href="/dashboard">
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
