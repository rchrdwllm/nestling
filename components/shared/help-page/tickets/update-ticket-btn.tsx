"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateTicket } from "@/server/actions/update-ticket";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

type UpdateTicketBtnProps = {
  ticketId: string;
  ticketStatus: "open" | "in-progress" | "closed";
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
          status: value as "open" | "in-progress" | "closed",
        });
      }}
      disabled={isExecuting}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="open">
          <div className="flex items-center gap-2">
            <div
              style={{ backgroundColor: "#fb923c" }}
              className="size-2 rounded-full"
            ></div>
            <span>Open</span>
          </div>
        </SelectItem>
        <SelectItem value="in-progress">
          <div className="flex items-center gap-2">
            <div
              style={{ backgroundColor: "#fcd34d" }}
              className="size-2 rounded-full"
            ></div>
            <span>In progress</span>
          </div>
        </SelectItem>
        <SelectItem value="closed">
          <div className="flex items-center gap-2">
            <div
              style={{ backgroundColor: "#4ade80" }}
              className="size-2 rounded-full"
            ></div>
            <span>Closed</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UpdateTicketBtn;
