import { CloudinaryFile } from "@/types";
import { FileIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const FilePreview = ({
  resource_type,
  secure_url,
  public_id,
}: CloudinaryFile) => {
  console.log(secure_url);

  if (resource_type === "image") {
    return (
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
