import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/user";

const Dashboard = async () => {
  const user = await getCurrentUser();

  return (
    <form
      action={async () => {
        "use server";

        await signOut({ redirectTo: "/login" });
      }}
      className="h-screen flex w-full justify-center items-center"
    >
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="text-3xl font-semibold">
          Welcome to Nestling, admin {user.firstName}!
        </h1>
        <Button
          variant="secondary"
          className="hover:bg-primary hover:text-primary-foreground"
          type="submit"
        >
          Sign out
        </Button>
      </div>
    </form>
  );
};

export default Dashboard;
