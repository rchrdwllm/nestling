import { getAllStudents } from "@/lib/user";

const TotalStudentsOverview = async () => {
  const { success: allStudents, error: allStudentsError } =
    await getAllStudents();

  if (allStudentsError) {
    return <div>{allStudentsError}</div>;
  }

  if (!allStudents) {
    return <p>Loading...</p>;
  }

  return (
    <article className="border border-border shadow-sm rounded-xl p-4 flex flex-col gap-2">
      <p className="text-sm">Total students</p>
      <h1 className="font-mono font-semibold text-4xl">{allStudents.length}</h1>
      <p className="text-muted-foreground text-sm">
        Last updated: {new Date().toLocaleString()}
      </p>
    </article>
  );
};

export default TotalStudentsOverview;
