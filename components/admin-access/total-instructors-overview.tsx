import { getAllInstructors } from "@/lib/user";

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
    <article className="border border-border rounded-xl p-4 flex flex-col gap-2">
      <h1 className="font-mono font-semibold text-4xl text-primary">
        {allInstructors.length}
      </h1>
      <p className="font-medium">Total instructors</p>
      <p className="text-muted-foreground">
        Last updated: {new Date().toLocaleString()}
      </p>
    </article>
  );
};

export default TotalInstructorsOverview;
