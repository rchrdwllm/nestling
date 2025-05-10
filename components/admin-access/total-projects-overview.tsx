import { getAllStudents } from "@/lib/user";

const TotalProjectsOverview = async () => {
  const { success: allStudents, error: allStudentsError } =
    await getAllStudents();

  if (allStudentsError) {
    return <div>{allStudentsError}</div>;
  }

  if (!allStudents) {
    return <p>Loading...</p>;
  }

  return (
    <article className="border border-border rounded-xl p-4 flex flex-col gap-2">
      <h1 className="font-mono font-semibold text-4xl text-primary">
        {allStudents.length}
      </h1>
      <p className="font-medium">Total projects</p>
      <p className="text-muted-foreground">
        Last updated: {new Date().toLocaleString()}
      </p>
    </article>
  );
};

export default TotalProjectsOverview;
