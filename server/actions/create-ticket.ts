"use server";

import { CreateTicketSchema } from "@/schemas/CreateTicketSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { getOptimisticUser } from "@/lib/user";

export const createTicket = actionClient
  .schema(CreateTicketSchema)
  .action(async ({ parsedInput }) => {
    const { title, description } = parsedInput;
    const user = await getOptimisticUser();

    try {
      const id = crypto.randomUUID();
      const ticketRef = db.collection("tickets").doc(id);

      await ticketRef.set({
        id,
        title,
        description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "open",
        userId: user.id,
      });

      return { success: "Ticket created successfully" };
    } catch (error) {
      console.error("Error creating ticket:", error);

      return { error };
    }
  });
