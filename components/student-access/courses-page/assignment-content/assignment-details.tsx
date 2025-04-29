import { getStudentAssignmentSubmission } from "@/lib/submission";
import { getOptimisticUser } from "@/lib/user";
import { cn } from "@/lib/utils";
import { Content } from "@/types";
import { format } from "date-fns";

type AssignmentDetailsProps = Content & {
  submissionsLength?: number;
};

const AssignmentDetails = async ({
  startDate,
  endDate,
  points,
  maxAttempts,
  submissionType,
  id,
  submissionsLength,
}: AssignmentDetailsProps) => {
  const user = await getOptimisticUser();
  const { success: submissions, error } = await getStudentAssignmentSubmission(
    id,
    user.id
  );

  if (error) {
    return <div>{error}</div>;
  }

  if (!submissions) {
    return <div>Loading...</div>;
  }

  const latestSubmission = submissions[0];

  return (
    <section
      className={cn(
        "border-b py-8 grid grid-cols-3 gap-8",
        latestSubmission
          ? latestSubmission.isGraded
            ? "grid-cols-4"
            : null
          : null
      )}
    >
      <div>
        <p className="text-muted-foreground">
          Start date:{" "}
          <span className="text-foreground">
            {format(new Date(startDate!), "LLLL dd, y p")}
          </span>
        </p>
        <p className="text-muted-foreground">
          End date:{" "}
          <span className="text-foreground">
            {format(new Date(endDate!), "LLLL dd, y p")}
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
          Attempts done:{" "}
          <span className="text-foreground">
            {submissionsLength ? submissionsLength : 0}
          </span>
        </p>
        <p className="text-muted-foreground">
          Submission type:{" "}
          <span className="text-foreground">
            {submissionType!.charAt(0).toUpperCase() +
              submissionType!.slice(1).toLowerCase()}
          </span>
        </p>
      </div>
      {latestSubmission && latestSubmission.isGraded ? (
        <div>
          <p className="text-muted-foreground">
            Grade:{" "}
            <span className="text-foreground">{latestSubmission.grade}</span>
          </p>
        </div>
      ) : null}
    </section>
  );
};

export default AssignmentDetails;
