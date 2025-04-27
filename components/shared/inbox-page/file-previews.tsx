import { CloudinaryFile } from "@/types";
import FilePreview from "./file-preview";

type FilePreviewsProps = {
  files: CloudinaryFile[];
};

const FilePreviews = ({ files }: FilePreviewsProps) => {
  return (
    <div className="absolute left-0 px-4 w-full flex gap-1 -translate-y-full py-4 bg-background">
      {files.map((file) => (
        <FilePreview key={file.secure_url} {...file} />
      ))}
    </div>
  );
};

export default FilePreviews;
