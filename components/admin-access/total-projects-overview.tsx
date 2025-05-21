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
    <article className="border border-border rounded-xl p-4 flex flex-col gap-2 shadow-sm">
      <p className="text-sm">Total projects</p>
      <h1 className="font-mono font-semibold text-4xl">{allStudents.length}</h1>
      <p className="text-muted-foreground text-sm">
        Last updated: {new Date().toLocaleString()}
      </p>
    </article>
  );
};

export default TotalProjectsOverview;
