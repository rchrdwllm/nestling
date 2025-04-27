import { CloudinaryFile } from "@/types";
import FilePreview from "./file-preview";

type FilePreviewsProps = {
  files: CloudinaryFile[];
};

const FilePreviews = ({ files }: FilePreviewsProps) => {
  return (
    <div className="flex gap-1">
      {files.map((file) => (
        <FilePreview key={file.secure_url} {...file} />
      ))}
    </div>
  );
};

export default FilePreviews;
