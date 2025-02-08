import { signOut } from "@/auth";

const Dashboard = () => {
  return (
    <form
      action={async () => {
        "use server";

        await signOut({ redirectTo: "/login" });
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
};

export default Dashboard;
