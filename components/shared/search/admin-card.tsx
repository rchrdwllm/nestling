"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/context/search-context";
import { useCurrentUser } from "@/hooks/use-current-user";
import { generateChannelId } from "@/lib/utils";
import { User } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo } from "react";

type AdminCardProps = {
  isInbox?: boolean;
} & User;

const AdminCard = memo(
  ({ id, name, email, image, isInbox }: AdminCardProps) => {
    const { user } = useCurrentUser();
    const channelName = generateChannelId(user.id, id);
    const router = useRouter();
    const { setSearchItemClicked } = useSearchStore();

    if (isInbox)
      return (
        <Button
          variant="ghost"
          onClick={() => {
            router.push(
              `/inbox/${channelName}?senderId=${user.id}&receiverId=${id}`
            );
            setSearchItemClicked(true);
          }}
          className="flex justify-start items-center gap-2 w-full text-left"
        >
          {image ? (
            <Avatar className="size-10">
              <AvatarImage src={image} className="object-cover" />
              <AvatarFallback>
                <div className="group flex justify-center items-center bg-muted rounded-full size-10">
                  <p className="font-semibold text-sm">{name![0]}</p>
                </div>
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="group flex justify-center items-center bg-muted rounded-full size-10">
              <p className="font-semibold text-sm">{name![0]}</p>
            </div>
          )}
          <div className="flex flex-col text-left">
            <p className="font-medium text-sm">{name}</p>
            <p className="text-muted-foreground text-xs">{email}</p>
          </div>
        </Button>
      );

    return (
      <Link
        href={`/profile?userId=${id}`}
        onClick={() => {
          setSearchItemClicked(true);
        }}
        className="w-full"
      >
        <Button
          variant="ghost"
          className="flex justify-start items-center gap-2 w-full text-left"
        >
          {image ? (
            <Avatar className="size-10">
              <AvatarImage src={image} className="object-cover" />
              <AvatarFallback>
                <div className="group flex justify-center items-center bg-muted rounded-full size-10">
                  <p className="font-semibold text-sm">{name![0]}</p>
                </div>
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="group flex justify-center items-center bg-muted rounded-full size-10">
              <p className="font-semibold text-sm">{name![0]}</p>
            </div>
          )}
          <div className="flex flex-col text-left">
            <p className="font-medium text-sm">{name}</p>
            <p className="text-muted-foreground text-xs">{email}</p>
          </div>
        </Button>
      </Link>
    );
  }
);

export default AdminCard;
