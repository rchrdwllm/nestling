import { getAllInstructors } from "@/lib/user";
import DateDisplay from "../../ui/date-display";
import ErrorToast from "@/components/ui/error-toast";

const TotalInstructorsOverview = async () => {
  const { success: allInstructors, error: allInstructorsError } =
    await getAllInstructors();

  if (allInstructorsError || !allInstructors) {
    return (
      <ErrorToast
        error={"Error fetching total instructors: " + allInstructorsError}
      />
    );
  }

  return (
    <article className="flex flex-col gap-2 shadow-sm p-4 border border-border rounded-xl">
      <p className="font-medium text-sm">Total instructors</p>
      <h1 className="font-mono font-semibold text-4xl">
        {allInstructors.length}
      </h1>
      <p className="text-muted-foreground text-sm">
        Last updated:{" "}
        <DateDisplay outputFormat="MMMM d, yyyy h:mm a" date={new Date()} />
      </p>
    </article>
  );
};

export default TotalInstructorsOverview;
