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
import { projectPriorities, projectStatuses } from "@/constants/project";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format, parseISO } from "date-fns";

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
          <TableHead>Priority</TableHead>
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
            const priorityObj = projectPriorities.find(
              (p) => p.value === project.priority
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
                  <Badge style={{ backgroundColor: priorityObj?.color }}>
                    {priorityObj?.name ?? project.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(project.startDate).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(project.endDate).toLocaleString()}
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
