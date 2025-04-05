"use client";

import SearchBar from "@/components/instructor-access/search-bar/search-bar";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut, useSession } from "next-auth/react";
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
    <div className="h-screen w-full p-6 pt-8">
      <div>
        <SearchBar />
      </div>
      <div className="h-full flex flex-col gap-4 justify-center items-center">
        <h1 className="text-3xl font-semibold">
          Welcome to Nestling, instructor {user.firstName}!
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
