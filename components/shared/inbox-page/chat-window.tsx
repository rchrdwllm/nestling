"use client";

import { useInboxStore } from "@/context/inbox-context";

const ChatWindow = () => {
  const { selectedUserId } = useInboxStore();

  return (
    <div>
      {selectedUserId
        ? `Selected User ID: ${selectedUserId}`
        : "No user selected"}
    </div>
  );
};

export default ChatWindow;
