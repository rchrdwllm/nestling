"use server";

import { db } from "@/lib/firebase";
import { actionClient } from "../action-client";
import { Ticket } from "@/types";
import { revalidateTag } from "next/cache";
import { UpdateTicketSchema } from "@/schemas/UpdateTicketSchema";

export const updateTicket = actionClient
  .schema(UpdateTicketSchema)
  .action(async ({ parsedInput }) => {
    const { ticketId, status } = parsedInput;

    try {
      const ticketRef = db.collection("tickets").doc(ticketId);
      const ticketDoc = await ticketRef.get();

      if (!ticketDoc.exists) {
        return { error: "Ticket not found" };
      }

      await ticketRef.update({
        status,
        updatedAt: new Date().toISOString(),
      });

      revalidateTag("tickets");

      return { success: "Ticket status updated" };
    } catch (error) {
      console.error("Error updating ticket:", error);

      return { error };
    }
  });
