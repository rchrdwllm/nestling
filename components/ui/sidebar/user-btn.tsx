"use client";

import { LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useMemo } from "react";
import ThemeToggler from "../theme-toggler";

const UserBtn = () => {
  const { user } = useCurrentUser();
  const profileLink = useMemo(() => {
    if (user) {
      if (user.role === "student") {
        return `/student-profile?userId=${user.id}`;
      } else if (user.role === "instructor") {
        return `/instructor-profile?userId=${user.id}`;
      } else {
        return `/admin-profile?userId=${user.id}`;
      }
    }

    return "";
  }, [user]);

  if (!user) return null;

  const handleSignOut = () => {
    signOut()
      .then(() => {
        fetch("/api/revalidate", {
          method: "POST",
          body: JSON.stringify({
            tags: ["courses", "students", "contents", "modules"],
          }),
        });
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="mt-auto">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {user.image ? (
            <Avatar className="size-10">
              <AvatarImage src={user.image} className="object-cover" />
              <AvatarFallback>
                <div className="group flex items-center justify-center size-10 bg-muted rounded-full transition-colors hover:bg-primary">
                  <p className="text-sm font-semibold transition-colors group-hover:text-primary-foreground">
                    {user.name![0]}
                  </p>
                </div>
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="group flex items-center justify-center size-10 bg-muted rounded-full transition-colors hover:bg-primary">
              <p className="text-sm font-semibold transition-colors group-hover:text-primary-foreground">
                {user.name![0]}
              </p>
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="p-4 min-w-[250px]">
          <div className="group flex flex-col gap-2 items-center justify-center rounded-md w-full py-6 bg-muted">
            {user.image ? (
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.image} className="object-cover" />
                <AvatarFallback>
                  <p className="font-medium">{user.name![0]}</p>
                </AvatarFallback>
              </Avatar>
            ) : (
              <p className="font-medium">{user.name![0]}</p>
            )}
            <p className="text-xs font-medium">{user.name}</p>
            <p className="text-xs">{user.email}</p>
          </div>
          <DropdownMenuSeparator className="my-4" />
          <Link href={profileLink}>
            <DropdownMenuItem className="flex gap-2 cursor-pointer">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="cursor-pointer">
            <ThemeToggler />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2 cursor-pointer"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserBtn;
