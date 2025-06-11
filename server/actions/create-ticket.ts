"use server";

import { CreateTicketSchema } from "@/schemas/CreateTicketSchema";
import { actionClient } from "../action-client";
import { db } from "@/lib/firebase";
import { getUnarchivedAdmins, getOptimisticUser } from "@/lib/user";
import { revalidateTag } from "next/cache";
import { createNotif } from "./create-notif";
import { sendNotification } from "./send-notification";
import { logUserActivity } from "./log-user-activity";

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

      const { success: admins, error: adminsError } =
        await getUnarchivedAdmins();

      if (adminsError || !admins) {
        console.error(
          "Error creating ticket and fetching admins: ",
          adminsError
        );

        return { error: adminsError };
      }

      const adminIds = admins.map((admin) => admin.id);

      await createNotif({
        title: `New ticket: ${title}`,
        message: `A new ticket has been created by ${user.name}.`,
        type: "ticket",
        url: `/help/tickets/${id}`,
        receiverIds: adminIds,
        senderId: user.id,
      });
      await sendNotification({
        title: `New ticket: ${title}`,
        body: `A new ticket has been created by ${user.name}.`,
        userIds: adminIds,
      });
      await logUserActivity({
        userId: user.id,
        type: "ticket_created",
        targetId: id,
        details: {
          title,
          description,
          role: user.role,
        },
      });

      revalidateTag("tickets");

      return { success: "Ticket created successfully" };
    } catch (error) {
      console.error("Error creating ticket:", error);

      return { error };
    }
  });
