"use server";

import { unstable_cache } from "next/cache";
import { db } from "./firebase";
import { Ticket } from "@/types";

export const getAllTickets = unstable_cache(
  async () => {
    try {
      const ticketsRef = await db
        .collection("tickets")
        .orderBy("createdAt", "desc")
        .get();
      const tickets = ticketsRef.docs.map((doc) => doc.data()) as Ticket[];

      return { success: tickets };
    } catch (error) {
      console.error("Error fetching tickets:", error);

      return { error };
    }
  },
  ["allTickets"],
  { revalidate: 60 * 60, tags: ["tickets"] }
);

export const getOpenTickets = unstable_cache(
  async (limit: number = 5, lastDocId?: string) => {
    try {
      let query = db
        .collection("tickets")
        .where("status", "==", "open")
        .where("isArchived", "==", false)
        .orderBy("createdAt", "desc")
        .limit(limit + 1);

      if (lastDocId) {
        const lastDoc = await db.collection("tickets").doc(lastDocId).get();
        if (lastDoc.exists) {
          query = query.startAfter(lastDoc);
        }
      }

      const ticketsRef = await query.get();
      const docs = ticketsRef.docs;
      const hasMore = docs.length > limit;
      const tickets = docs.slice(0, limit).map((doc) => doc.data()) as Ticket[];
      const newLastDocId =
        docs.length > 0 ? docs[Math.min(docs.length, limit) - 1].id : undefined;

      return { success: tickets, hasMore, lastDocId: newLastDocId };
    } catch (error) {
      console.error("Error fetching open tickets:", error);
      return { error };
    }
  }
);

export const getInProgressTickets = unstable_cache(
  async (limit: number = 5, lastDocId?: string) => {
    try {
      let query = db
        .collection("tickets")
        .where("status", "==", "in-progress")
        .where("isArchived", "==", false)
        .orderBy("createdAt", "desc")
        .limit(limit + 1);

      if (lastDocId) {
        const lastDoc = await db.collection("tickets").doc(lastDocId).get();
        if (lastDoc.exists) {
          query = query.startAfter(lastDoc);
        }
      }

      const ticketsRef = await query.get();
      const docs = ticketsRef.docs;
      const hasMore = docs.length > limit;
      const tickets = docs.slice(0, limit).map((doc) => doc.data()) as Ticket[];
      const newLastDocId =
        docs.length > 0 ? docs[Math.min(docs.length, limit) - 1].id : undefined;

      return { success: tickets, hasMore, lastDocId: newLastDocId };
    } catch (error) {
      console.error("Error fetching in-progress tickets:", error);
      return { error };
    }
  }
);

export const getClosedTickets = unstable_cache(
  async (limit: number = 5, lastDocId?: string) => {
    try {
      let query = db
        .collection("tickets")
        .where("status", "==", "closed")
        .where("isArchived", "==", false)
        .orderBy("createdAt", "desc")
        .limit(limit + 1);

      if (lastDocId) {
        const lastDoc = await db.collection("tickets").doc(lastDocId).get();
        if (lastDoc.exists) {
          query = query.startAfter(lastDoc);
        }
      }

      const ticketsRef = await query.get();
      const docs = ticketsRef.docs;
      const hasMore = docs.length > limit;
      const tickets = docs.slice(0, limit).map((doc) => doc.data()) as Ticket[];
      const newLastDocId =
        docs.length > 0 ? docs[Math.min(docs.length, limit) - 1].id : undefined;

      return { success: tickets, hasMore, lastDocId: newLastDocId };
    } catch (error) {
      console.error("Error fetching closed tickets:", error);
      return { error };
    }
  }
);

export const getArchivedTickets = unstable_cache(
  async (limit: number = 5, lastDocId?: string) => {
    try {
      let query = db
        .collection("tickets")
        .where("isArchived", "==", true)
        .orderBy("createdAt", "desc")
        .limit(limit + 1);

      if (lastDocId) {
        const lastDoc = await db.collection("tickets").doc(lastDocId).get();
        if (lastDoc.exists) {
          query = query.startAfter(lastDoc);
        }
      }

      const ticketsRef = await query.get();
      const docs = ticketsRef.docs;
      const hasMore = docs.length > limit;
      const tickets = docs.slice(0, limit).map((doc) => doc.data()) as Ticket[];
      const newLastDocId =
        docs.length > 0 ? docs[Math.min(docs.length, limit) - 1].id : undefined;

      return { success: tickets, hasMore, lastDocId: newLastDocId };
    } catch (error) {
      console.error("Error fetching archived tickets:", error);
      return { error };
    }
  }
);

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
