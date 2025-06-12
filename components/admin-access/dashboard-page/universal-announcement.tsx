"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UniversalAnnouncement = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
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
        const storageRef = ref(storage, `universalAnnouncements/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "universalAnnouncements"), {
        title,
        description: desc,
        image: imageUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isArchived: false,
        archivedAt: null,
      });

      setOpen(false);
      setTitle("");
      setDesc("");
      setImageFile(null);
      setDragActive(false);
    } catch (error) {
      alert("Failed to create announcement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="bg-red-600 text-white">
        Create Announcement
      </Button>
      {open && (
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
                  accept="image/*"
                  className="hidden"
                  id="announcement-image"
                  onChange={handleFileChange}
                />
                <label htmlFor="announcement-image" className="flex flex-col items-center cursor-pointer">
                  <span className="text-3xl mb-2 text-gray-400">📎</span>
                  <span className="text-gray-500">
                    {imageFile
                      ? imageFile.name
                      : "Drag & drop an image here, or click to upload"}
                  </span>
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