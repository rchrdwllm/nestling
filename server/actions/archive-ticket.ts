"use server";

import { ArchiveTicketSchema } from "@/schemas/ArchiveTicket";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { Ticket } from "@/types";
import { revalidateTag } from "next/cache";

export const archiveTicket = actionClient
  .schema(ArchiveTicketSchema)
  .action(async ({ parsedInput }) => {
    const { ticketId } = parsedInput;

    try {
      const ticketRef = db.collection("tickets").doc(ticketId);
      const ticketSnapshot = await ticketRef.get();

      if (!ticketSnapshot.exists) {
        return { error: "Ticket not found" };
      }

      const ticketData = ticketSnapshot.data() as Ticket;
      const isArchived = ticketData.isArchived || false;

      ticketRef.update({
        isArchived: !isArchived,
        archivedAt: !isArchived ? new Date().toISOString() : null,
      });

      revalidateTag("tickets");

      return {
        success: !isArchived
          ? "Ticket archived successfully"
          : "Ticket unarchived successfully",
      };
    } catch (error) {
      console.error("Error archiving ticket:", error);

      return { error: JSON.stringify(error) };
    }
  });
