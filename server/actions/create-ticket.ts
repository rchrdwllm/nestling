"use server";

import { CreateTicketSchema } from "@/schemas/CreateTicketSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { getOptimisticUser } from "@/lib/user";
import { revalidateTag } from "next/cache";

export const createTicket = actionClient
  .schema(CreateTicketSchema)
  .action(async ({ parsedInput }) => {
    const { title, description, priority, category } = parsedInput;
    const user = await getOptimisticUser();

    try {
      const id = crypto.randomUUID();
      const ticketRef = db.collection("tickets").doc(id);

      await ticketRef.set({
        id,
        title,
        description,
        status: "open",
        priority,
        category,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user.id,
      });

      revalidateTag("tickets");

      return { success: "Ticket created successfully" };
    } catch (error) {
      console.error("Error creating ticket:", error);

      return { error };
    }
  });
