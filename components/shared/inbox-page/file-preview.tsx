import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { CloudinaryFile } from "@/types";
import { FileIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const FilePreview = ({
  resource_type,
  secure_url,
  public_id,
}: CloudinaryFile) => {
  const [isLoaded, setIsLoaded] = useState(false);

  if (resource_type === "image") {
    return (
      <article className="relative aspect-square size-36" key={secure_url}>
        <div
          className={cn(
            "absolute top-0 left-0 h-full w-full z-10 transition-opacity",
            isLoaded ? "opacity-0" : "opacity-100"
          )}
        >
          <Skeleton className="h-full w-full" />
        </div>
        <Image
          onLoad={() => setIsLoaded(true)}
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
      <div className="relative aspect-square bg-secondary rounded-md gap-2 px-4 cursor-pointer flex flex-col justify-center items-center h-36">
        <FileIcon className="h-8 w-8 text-gray-500" />
        <p className="text-sm text-muted-foreground">{public_id}</p>
      </div>
    );
  }

  if (resource_type === "video") {
    return (
      <article className="relative aspect-square h-36" key={secure_url}>
        <p>Video file: {public_id}</p>
      </article>
    );
  }

  return <div>FilePreview</div>;
};

export default FilePreview;
