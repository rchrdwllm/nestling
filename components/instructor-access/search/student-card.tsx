import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import Link from "next/link";
import { memo } from "react";

const StudentCard = memo(({ id, name, email, image }: User) => {
  return (
    <Link href={`/instructor-search/user/${id}`} className="w-full">
      <Button
        variant="ghost"
        className="flex text-left items-center justify-start gap-2 w-full"
      >
        {image ? (
          <Avatar className="size-10">
            <AvatarImage src={image} className="object-cover" />
            <AvatarFallback>
              <div className="group flex items-center justify-center size-10 bg-muted rounded-full">
                <p className="text-sm font-semibold">{name![0]}</p>
              </div>
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="group flex items-center justify-center size-10 bg-muted rounded-full">
            <p className="text-sm font-semibold">{name![0]}</p>
          </div>
        )}
        <div className="flex text-left flex-col">
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{email}</p>
        </div>
      </Button>
    </Link>
  );
});

export default StudentCard;
