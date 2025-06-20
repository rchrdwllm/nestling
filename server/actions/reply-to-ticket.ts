"use server";

import { ReplyTicketSchema } from "@/schemas/ReplyTicketSchema";
import { actionClient } from "../action-client";
import { getOptimisticUser } from "@/lib/user";
import { db } from "@/lib/firebase";
import { revalidateTag } from "next/cache";
import { Ticket } from "@/types";
import { createNotif } from "./create-notif";
import { sendNotification } from "./send-notification";
import { logUserActivity } from "./log-user-activity";

export const replyToTicket = actionClient
  .schema(ReplyTicketSchema)
  .action(async ({ parsedInput }) => {
    const { reply, ticketId } = parsedInput;
    const user = await getOptimisticUser();

    try {
      const id = crypto.randomUUID();
      const replyRef = db.collection("ticketReplies").doc(id);
      const ticketSnapshot = await db.collection("tickets").doc(ticketId).get();

      if (!ticketSnapshot.exists) {
        return { error: "Ticket not found" };
      }

      const ticket = ticketSnapshot.data() as Ticket;
      const batch = db.batch();

      const replyData = {
        id,
        reply,
        userId: user.id,
        ticketId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      batch.set(replyRef, replyData);

      const ticketRepliesRef = db
        .collection("tickets")
        .doc(ticketId)
        .collection("ticketReplies")
        .doc(id);
      const replyTicketRef = db
        .collection("ticketReplies")
        .doc(id)
        .collection("ticket")
        .doc(ticketId);

      const reference = {
        replyId: id,
        createdAt: new Date().toISOString(),
        ticketId,
      };

      batch.set(ticketRepliesRef, reference);
      batch.set(replyTicketRef, reference);

      await batch.commit();

      await createNotif({
        title: `New reply on ticket: ${ticket.title}`,
        message: `You have a new reply on your ticket: ${ticket.title}.`,
        type: "ticket_reply",
        url: `/support-tickets/${ticketId}`,
        receiverIds: [ticket.userId],
        senderId: user.id,
      });
      await sendNotification({
        title: `New reply on ticket: ${ticket.title}`,
        body: `You have a new reply on your ticket: ${ticket.title}.`,
        userIds: [ticket.userId],
      });
      await logUserActivity({
        userId: user.id,
        type: "ticket_reply",
        targetId: ticketId,
        details: {
          reply,
          ticketId,
          role: user.role,
        },
      });

      revalidateTag("tickets");
      revalidateTag("ticketReplies");

      return { success: "Replied to ticket successfully" };
    } catch (error) {
      console.error("Error replying to ticket:", error);

      return { error };
    }
  });
