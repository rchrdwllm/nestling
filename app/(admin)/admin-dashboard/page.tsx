"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useCurrentUser();

  const handleSignOut = async () => {
    setIsLoading(true);

    toast.loading("Signing out...");

    await signOut({ callbackUrl: "/api/auth/signin", redirect: true });

    toast.success("Signed out successfully!");

    setIsLoading(false);
  };

  return (
    <div className="h-screen flex w-full justify-center items-center">
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="text-3xl font-semibold">
          Welcome to Nestling, admin {user.firstName}!
        </h1>
        <Button
          variant="secondary"
          className="hover:bg-primary hover:text-primary-foreground"
          onClick={handleSignOut}
          disabled={isLoading}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
