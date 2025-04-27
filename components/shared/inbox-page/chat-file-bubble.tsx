import { File } from "@/types";
import { FileIcon } from "lucide-react";
import Image from "next/image";

const ChatFileBubble = ({ secure_url, public_id, resource_type }: File) => {
  if (resource_type === "image") {
    return (
      <article className="relative aspect-square size-36" key={secure_url}>
        <Image
          className="rounded-md object-cover"
          fill
          src={secure_url}
          alt={public_id}
        />
      </article>
    );
  }

  if (resource_type === "raw") {
    return (
      <article
        className="relative aspect-square bg-secondary rounded-md gap-2 px-4 cursor-pointer flex flex-col justify-center items-center h-36"
        key={secure_url}
      >
        <FileIcon className="h-8 w-8 text-gray-500" />
        <p className="text-sm text-muted-foreground">{public_id}</p>
      </article>
    );
  }

  if (resource_type === "video") {
    return (
      <article className="relative aspect-square h-36" key={secure_url}>
        <p>Video file: {public_id}</p>
      </article>
    );
  }

  return (
    <article className="relative aspect-square h-36" key={secure_url}>
      <Image
        className="rounded-md object-cover"
        fill
        src={secure_url}
        alt={public_id}
      />
    </article>
  );
};

export default ChatFileBubble;
