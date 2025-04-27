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

const ChatFileBubble = ({ secure_url, public_id, resource_type }: File) => {
  if (resource_type === "image") {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <article
            className="relative aspect-square size-36 cursor-pointer"
            key={secure_url}
          >
            <Image
              className="rounded-md object-cover"
              fill
              src={secure_url}
              alt={public_id}
            />
          </article>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>{public_id}</DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="p-4 w-full h-96 flex flex-col gap-4">
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
        className="relative aspect-square bg-secondary rounded-md gap-2 px-4 cursor-pointer flex flex-col justify-center items-center h-36"
        download
      >
        <FileIcon className="h-8 w-8 text-gray-500" />
        <p className="text-sm text-muted-foreground">{public_id}</p>
      </Link>
    );
  }

  if (resource_type === "video") {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <article className="relative aspect-square h-36" key={secure_url}>
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
        <article className="relative aspect-square h-36" key={secure_url}>
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
