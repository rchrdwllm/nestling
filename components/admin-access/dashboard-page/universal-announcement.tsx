"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { uploadImgToCloudinary } from "@/server/actions/upload-to-cloudinary";
import { createUniversalAnnouncement } from "@/lib/universal-announcement";
import { Paperclip, FileText } from "lucide-react";
import FadeInWrapper from "@/components/wrappers/fadein-wrapper";

const UniversalAnnouncement = () => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setFileType(file.type);
      if (file.type.startsWith("image/")) {
        setImagePreview(URL.createObjectURL(file));
      } else {
        setImagePreview(null);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;
    setLoading(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        const result = await uploadImgToCloudinary(imageFile);
        if (result.success) {
          imageUrl = result.success.url; // or result.success.secure_url, depending on your API
        } else {
          alert("Failed to upload image");
          return;
        }
      }
      const myObject = {
        title: title,
        description: desc,
        image: imageUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isArchived: false,
        archivedAt: title,
      };
      const jsonString = JSON.stringify(myObject);
      await createUniversalAnnouncement({ jsonString });
      alert("Announcement created successfully!");

      setOpen(false);
      setTitle("");
      setDesc("");
      setImageFile(null);
      setImagePreview(null);
      setDragActive(false);
    } catch (error) {
      alert("Failed to create announcement");
    } finally {
      setLoading(false);
    }
  };

  // Handle mounting/unmounting for fade out
  useEffect(() => {
    if (open) {
      setShowModal(true);
    } else if (showModal) {
      // Wait for fade-out animation (e.g., 300ms)
      const timeout = setTimeout(() => setShowModal(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="bg-red-600 text-white">
        Create Announcement
      </Button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-black"
              onClick={() => setOpen(false)}
              aria-label="Close"
              type="button"
            >
              ×
            </button>
            <h2 className="text-2xl font-semibold mb-1">Create announcement</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                className="border rounded px-3 py-2 outline-none focus:border-red-500"
                placeholder="Announcement title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                className="border rounded px-3 py-2 outline-none focus:border-red-500"
                placeholder="Announcement description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={3}
                required
              />
              <div
                className={`flex flex-col items-center justify-center border-2 border-solid rounded-lg p-6 mb-2 transition-colors duration-200 ${
                  dragActive
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 bg-white hover:border-red-400 hover:bg-red-50 cursor-pointer"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                style={{ minHeight: 80 }}
              >
                <input
                  type="file"
                  className="hidden"
                  id="announcement-image"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="announcement-image"
                  className="flex flex-col items-center cursor-pointer w-full relative"
                >
                  <Paperclip size={28} className="mb-2 text-gray-400 group-hover:text-red-500 transition-colors" />
                  {!imageFile && (
                    <span className="text-gray-500 group-hover:text-red-600 transition-colors">
                      Upload image
                    </span>
                  )}
                  {/* File preview */}
                  {imageFile && (
                    <FadeInWrapper>
                      <div className="flex flex-col items-center mt-3 w-full relative">
                        {/* X button to remove file */}
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            setImageFile(null);
                            setImagePreview(null);
                            setFileType(null);
                          }}
                          className="absolute top-1 right-1 text-base text-gray-400 hover:text-red-500 bg-transparent border-none p-0 m-0 cursor-pointer z-20"
                          tabIndex={-1}
                          aria-label="Remove file"
                        >
                          x
                        </button>
                        {fileType && fileType.startsWith("image/") && imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="rounded max-h-32 object-contain border"
                          />
                        ) : (
                          <div className="flex flex-col items-center">
                            <div className="relative flex flex-col items-center">
                              <FileText size={48} className="text-gray-400" />
                              <span className="absolute bottom-0 right-0 bg-red-500 text-white text-xs px-2 py-0.5 rounded shadow">
                                {imageFile.name.split('.').pop()?.toUpperCase() || "FILE"}
                              </span>
                            </div>
                            <span className="text-xs text-gray-700 mt-2 text-center max-w-[180px] break-words">
                              {imageFile.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </FadeInWrapper>
                  )}
                </label>
              </div>
              <Button
                type="submit"
                className="bg-red-600 text-white w-full mt-2"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create announcement"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UniversalAnnouncement;