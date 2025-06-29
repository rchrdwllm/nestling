"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ticketStatuses } from "@/constants/ticket";
import { updateTicket } from "@/server/actions/update-ticket";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

type UpdateTicketBtnProps = {
  ticketId: string;
  ticketStatus: "open" | "in-progress" | "closed" | "re-opened";
};

const UpdateTicketBtn = ({ ticketId, ticketStatus }: UpdateTicketBtnProps) => {
  const { execute, isExecuting } = useAction(updateTicket, {
    onExecute: () => {
      toast.dismiss();
      toast.loading("Updating ticket status...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Ticket status updated!");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error("Error updating ticket: " + error);
    },
  });

  return (
    <Select
      value={ticketStatus}
      onValueChange={(value) => {
        execute({
          ticketId,
          status: value as "open" | "in-progress" | "closed" | "re-opened",
        });
      }}
      disabled={isExecuting}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {ticketStatuses.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            <div className="flex items-center gap-2">
              <div
                style={{ backgroundColor: status.color }}
                className="rounded-full size-2"
              ></div>
              <span>{status.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default UpdateTicketBtn;
