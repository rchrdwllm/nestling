"use server";

import { unstable_cache } from "next/cache";
import { db } from "./firebase";
import { Ticket } from "@/types";

export const getUserTickets = unstable_cache(
  async (userId: string) => {
    try {
      const ticketsRef = await db
        .collection("tickets")
        .where("userId", "==", userId)
        .orderBy("createdAt", "desc")
        .get();
      const tickets = ticketsRef.docs.map((doc) => doc.data()) as Ticket[];

      return { success: tickets };
    } catch (error) {
      console.error("Error fetching user tickets:", error);

      return { error };
    }
  },
  ["userId"],
  { revalidate: 60 * 60, tags: ["tickets"] }
);

export const getTicketById = unstable_cache(
  async (ticketId: string) => {
    try {
      const ticketRef = await db.collection("tickets").doc(ticketId).get();

      if (!ticketRef.exists) {
        return { error: "Ticket not found" };
      }

      const ticket = ticketRef.data() as Ticket;

      return { success: ticket };
    } catch (error) {
      console.error("Error fetching ticket:", error);

      return { error };
    }
  },
  ["ticketId"],
  { revalidate: 60 * 60, tags: ["tickets"] }
);
