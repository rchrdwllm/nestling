import { getProjects } from "@/lib/project";
import DateDisplay from "../../ui/date-display";

const TotalProjectsOverview = async () => {
  const { success: allProjects, error: allProjectsError } = await getProjects();

  if (allProjectsError) {
    return <div>{allProjectsError}</div>;
  }

  if (!allProjects) {
    return <p>Loading...</p>;
  }

  return (
    <article className="border border-border rounded-xl p-4 flex flex-col gap-2 shadow-sm">
      <p className="text-sm font-medium">Total projects</p>
      <h1 className="font-mono font-semibold text-4xl">{allProjects.length}</h1>
      <p className="text-muted-foreground text-sm">
        Last updated:{" "}
        <DateDisplay outputFormat="MMMM d, yyyy h:mm a" date={new Date()} />
      </p>
    </article>
  );
};

export default TotalProjectsOverview;
