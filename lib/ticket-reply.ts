"use server";

import { unstable_cache } from "next/cache";
import { db } from "./firebase";
import { TicketReply } from "@/types";

export const getTicketReplies = unstable_cache(
  async (ticketId: string) => {
    try {
      const ticketRepliesSnapshot = await db
        .collection("ticketReplies")
        .where("ticketId", "==", ticketId)
        .orderBy("createdAt", "asc")
        .get();
      const ticketReplies = ticketRepliesSnapshot.docs.map((doc) =>
        doc.data()
      ) as TicketReply[];

      return { success: ticketReplies };
    } catch (error) {
      console.error("Error fetching ticket replies:", error);

      return { error };
    }
  },
  ["ticketId"],
  { revalidate: 60 * 60, tags: ["ticketReplies"] }
);
