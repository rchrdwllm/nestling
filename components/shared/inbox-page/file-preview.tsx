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
  original_filename,
}: CloudinaryFile) => {
  const [isLoaded, setIsLoaded] = useState(false);

  if (resource_type === "image") {
    return (
      <article className="relative size-36 aspect-square" key={secure_url}>
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
      <div className="relative flex flex-col justify-center items-center gap-2 bg-secondary px-4 rounded-md h-36 aspect-square cursor-pointer">
        <FileIcon className="w-8 h-8 text-gray-500" />
        <p className="text-muted-foreground text-sm">{original_filename}</p>
      </div>
    );
  }

  if (resource_type === "video") {
    return (
      <article className="relative h-36 aspect-square" key={secure_url}>
        <p>Video file: {original_filename}</p>
      </article>
    );
  }

  return <div>FilePreview</div>;
};

export default FilePreview;
