import { getAllInstructors } from "@/lib/user";
import DateDisplay from "../ui/date-display";

const TotalInstructorsOverview = async () => {
  const { success: allInstructors, error: allInstructorsError } =
    await getAllInstructors();

  if (allInstructorsError) {
    return <div>{allInstructorsError}</div>;
  }

  if (!allInstructors) {
    return <p>Loading...</p>;
  }

  return (
    <article className="border border-border rounded-xl p-4 flex flex-col gap-2 shadow-sm">
      <p className="text-sm">Total instructors</p>
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
