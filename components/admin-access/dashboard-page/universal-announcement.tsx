"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";

const UniversalAnnouncement = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files) {
      setFiles(Array.from(e.dataTransfer.files));
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Handle announcement creation logic here
    setOpen(false);
    setTitle("");
    setDesc("");
    setFiles([]);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="bg-red-600 text-white">
        + Create Announcement
      </Button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-black"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-semibold mb-1">Create announcement</h2>
            <p className="mb-4 text-gray-500">Fill in the form below to create a new announcement</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                className="border rounded px-3 py-2 outline-none focus:border-red-500"
                placeholder="Announcement title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
              <textarea
                className="border rounded px-3 py-2 outline-none focus:border-red-500"
                placeholder="Announcement description"
                value={desc}
                onChange={e => setDesc(e.target.value)}
                rows={3}
                required
              />
              <div
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 mb-2 transition ${
                  dragActive ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <input
                  type="file"
                  multiple
                  className="hidden"
                  id="announcement-files"
                  onChange={handleFileChange}
                />
                <label htmlFor="announcement-files" className="flex flex-col items-center cursor-pointer">
                  <span className="text-3xl mb-2 text-gray-400">📎</span>
                  <span className="text-gray-500">
                    {files.length === 0 ? "Drag & drop files or images here, or click to upload" : `${files.length} file(s) selected`}
                  </span>
                </label>
              </div>
              <Button type="submit" className="bg-red-600 text-white w-full mt-2">
                Create announcement
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UniversalAnnouncement;