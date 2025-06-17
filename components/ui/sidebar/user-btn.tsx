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
import NotificationToggler from "@/components/shared/notifications/notification-toggler";
import { useAction } from "next-safe-action/hooks";
import { logUserActivity } from "@/server/actions/log-user-activity";
import SignOutBtn from "./sign-out-btn";
import { cn } from "@/lib/utils";

const UserBtn = () => {
  const { user } = useCurrentUser();
  const profileLink = useMemo(() => {
    if (user) {
      if (user.role === "student") {
        return `/profile?userId=${user.id}`;
      } else if (user.role === "instructor") {
        return `/profile?userId=${user.id}`;
      } else {
        return `/profile?userId=${user.id}`;
      }
    }

    return "";
  }, [user]);

  if (!user) return null;

  return (
    <div className="size-10">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {user.image ? (
            <Avatar className="size-10">
              <AvatarImage src={user.image} className="object-cover" />
              <AvatarFallback>
                <div className="group flex justify-center items-center bg-muted hover:bg-primary rounded-full size-10 transition-colors">
                  <p className="font-semibold group-hover:text-primary-foreground text-sm transition-colors">
                    {user.name![0]}
                  </p>
                </div>
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="group flex justify-center items-center bg-muted hover:bg-primary rounded-full size-10 transition-colors">
              <p className="font-semibold group-hover:text-primary-foreground text-sm transition-colors">
                {user.name![0]}
              </p>
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="p-4 min-w-[250px]">
          <div className="group flex flex-col justify-center items-center gap-2 bg-muted py-6 rounded-md w-full">
            {user.image ? (
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.image} className="object-cover" />
                <AvatarFallback>
                  <p className="font-medium">{user.name![0]}</p>
                </AvatarFallback>
              </Avatar>
            ) : (
              <p className="font-medium">{user.name![0]}</p>
            )}
            <p className="font-medium text-xs">{user.name}</p>
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
            <NotificationToggler />
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <ThemeToggler />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <SignOutBtn />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserBtn;
