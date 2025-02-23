"use client";

import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";

const UserBtn = () => {
  const { user } = useCurrentUser();

  return (
    <div className="mt-auto">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="size-10">
            <AvatarImage src={user?.image} />
            <AvatarFallback>
              <div className="rounded-full bg-primary size-10 flex justify-center items-center transition-all filter hover:brightness-125">
                <p className="text-white font-semibold">
                  {user?.name && user?.name[0]}
                </p>
              </div>
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserBtn;
