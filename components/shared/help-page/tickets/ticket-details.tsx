import { Card } from "@/components/ui/card";
import ErrorToast from "@/components/ui/error-toast";
import { getUserById } from "@/lib/user";
import { Ticket } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DateDisplay from "@/components/ui/date-display";

type TicketDetailsProps = {
  ticket: Ticket;
};

const TicketDetails = async ({ ticket }: TicketDetailsProps) => {
  const { success: ticketOwner, error: ticketOwnerError } = await getUserById(
    ticket.userId
  );

  if (ticketOwnerError || !ticketOwner) {
    return (
      <ErrorToast error={"Error fetching ticket owner: " + ticketOwnerError} />
    );
  }

  return (
    <Card className="p-6 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {ticketOwner.image ? (
          <Avatar className="size-10">
            <AvatarImage src={ticketOwner.image} className="object-cover" />
            <AvatarFallback>
              <div className="group flex items-center justify-center size-10 bg-muted rounded-full transition-colors hover:bg-primary">
                <p className="text-sm font-semibold transition-colors group-hover:text-primary-foreground">
                  {ticketOwner.name![0]}
                </p>
              </div>
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="group flex items-center justify-center size-10 bg-muted rounded-full transition-colors hover:bg-primary">
            <p className="text-sm font-semibold transition-colors group-hover:text-primary-foreground">
              {ticketOwner.name![0]}
            </p>
          </div>
        )}
        <div>
          <h1 className="text-xl font-semibold">{ticket.title}</h1>
          <p className="text-sm text-muted-foreground">
            Opened on <DateDisplay date={ticket.createdAt} />
          </p>
        </div>
      </div>
      <div className="ml-14">
        <p>{ticket.description}</p>
      </div>
    </Card>
  );
};

export default TicketDetails;
