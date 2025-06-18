import { File } from "@/types";
import { FileIcon } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const ChatFileBubble = ({ secure_url, public_id, resource_type }: File) => {
  const [isLoaded, setIsLoaded] = useState(false);

  if (resource_type === "image") {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <article
            className="relative size-36 aspect-square overflow-hidden cursor-pointer"
            key={secure_url}
          >
            <div
              className={cn(
                "absolute top-0 left-0 h-full w-full z-10 transition-opacity",
                isLoaded ? "opacity-0" : "opacity-100"
              )}
            >
              <Skeleton className="w-full h-full" />
            </div>
            <Image
              onLoad={() => setIsLoaded(true)}
              className={cn(
                "rounded-md object-cover opacity",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
              fill
              src={secure_url}
              alt={public_id}
            />
          </article>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>{public_id}</DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="flex flex-col gap-4 p-4 w-full h-96">
            <div className="relative size-full">
              <Image
                src={secure_url}
                alt={public_id}
                className="object-contain"
                fill
              />
            </div>
            <Link href={secure_url} download className="w-full">
              <Button className="w-full">Save image</Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (resource_type === "raw") {
    return (
      <Link
        href={secure_url}
        className="relative flex flex-col justify-center items-center gap-2 bg-muted-secondary px-4 rounded-md h-36 aspect-square cursor-pointer"
        download
      >
        <FileIcon className="w-8 h-8 text-gray-500" />
        <p className="text-muted-foreground text-sm">{public_id}</p>
      </Link>
    );
  }

  if (resource_type === "video") {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <article className="relative h-36 aspect-square" key={secure_url}>
            <p>Video file: {public_id}</p>
          </article>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <article className="relative h-36 aspect-square" key={secure_url}>
          <Image
            className="rounded-md object-cover"
            fill
            src={secure_url}
            alt={public_id}
          />
        </article>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ChatFileBubble;
