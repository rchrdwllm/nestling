import DateDisplay from "@/components/ui/date-display";
import { cn } from "@/lib/utils";
import { Content } from "@/types";

type AssignmentDetailsProps = Content;

const AssignmentDetails = async ({
  startDate,
  endDate,
  points,
  maxAttempts,
  submissionType,
}: AssignmentDetailsProps) => {
  return (
    <section className={cn("border-b py-8 grid grid-cols-3")}>
      <div>
        <p className="text-muted-foreground">
          Start date:{" "}
          <span className="text-foreground">
            <DateDisplay date={startDate!} outputFormat="MMMM d, yyyy h:mm a" />
          </span>
        </p>
        <p className="text-muted-foreground">
          End date:{" "}
          <span className="text-foreground">
            <DateDisplay date={endDate!} outputFormat="MMMM d, yyyy h:mm a" />
          </span>
        </p>
      </div>
      <div>
        <p className="text-muted-foreground">
          Points: <span className="text-foreground">{points}</span>
        </p>
        <p className="text-muted-foreground">
          Max attempts: <span className="text-foreground">{maxAttempts}</span>
        </p>
      </div>
      <div>
        <p className="text-muted-foreground">
          Submission type:{" "}
          <span className="text-foreground">
            {submissionType!.charAt(0).toUpperCase() +
              submissionType!.slice(1).toLowerCase()}
          </span>
        </p>
      </div>
    </section>
  );
};

export default AssignmentDetails;
