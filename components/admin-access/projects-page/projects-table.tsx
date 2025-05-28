import { Project } from "@/types";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { projectStatuses } from "@/constants/project-statuses";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ProjectsTableProps = {
  projects: Project[];
};

const ProjectsTable = ({ projects }: ProjectsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-center text-muted-foreground"
            >
              No projects found.
            </TableCell>
          </TableRow>
        ) : (
          projects.map((project) => {
            const statusObj = projectStatuses.find(
              (s) => s.value === project.status
            );
            return (
              <TableRow key={project.id}>
                <TableCell className="font-medium">
                  <Link href={`/projects/${project.id}`}>
                    <Button className="p-0 text-foreground" variant="link">
                      {project.title}
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>
                  <Badge style={{ backgroundColor: statusObj?.color }}>
                    {statusObj?.name ?? project.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(project.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(project.endDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};

export default ProjectsTable;
