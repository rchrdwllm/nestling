"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const UniversalAnnouncement = ({ onCreate }: { onCreate?: (text: string) => void }) => {
  const [showInput, setShowInput] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const handleCreate = () => {
    if (announcement.trim()) {
      onCreate?.(announcement.trim());
      setAnnouncement("");
      setShowInput(false);
    }
  };

  return (
    <div className="mb-4 flex items-center gap-2">
      {!showInput ? (
        <Button onClick={() => setShowInput(true)} className="bg-red-600 text-white">
          + Create Announcement
        </Button>
      ) : (
        <div className="flex gap-2 items-center">
          <input
            type="text"
            className="border rounded px-2 py-1"
            placeholder="Enter announcement..."
            value={announcement}
            onChange={e => setAnnouncement(e.target.value)}
            autoFocus
          />
          <Button onClick={handleCreate} className="bg-green-600 text-white px-3 py-1">
            Post
          </Button>
          <Button onClick={() => setShowInput(false)} variant="outline" className="px-3 py-1">
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default UniversalAnnouncement;