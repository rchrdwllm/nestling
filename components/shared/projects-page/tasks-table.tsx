import { Task, User } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DateDisplay from "@/components/ui/date-display";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projectPriorities, projectStatuses } from "@/constants/project";
import TaskSheetBtn from "./task-sheet-btn";

type TasksTableProps = {
  tasks: Task[];
  availableAssignees: User[];
};

const TasksTable = ({ tasks, availableAssignees }: TasksTableProps) => {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow key="no-tasks">
              <TableCell
                colSpan={6}
                className="text-center text-muted-foreground"
              >
                No tasks found
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => {
              const statusObj = projectStatuses.find(
                (s) => s.value === task.status
              );
              const priorityObj = projectPriorities.find(
                (p) => p.value === task.priority
              );

              return (
                <TableRow key={task.id}>
                  <TableCell>
                    <TaskSheetBtn
                      availableAssignees={availableAssignees}
                      task={task}
                    />
                  </TableCell>
                  <TableCell>
                    <Badge style={{ backgroundColor: statusObj?.color }}>
                      {statusObj?.name ?? task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge style={{ backgroundColor: priorityObj?.color }}>
                      {priorityObj?.name ?? task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DateDisplay
                      date={task.startDate}
                      outputFormat="MMMM d, yyyy"
                    />
                  </TableCell>
                  <TableCell>
                    <DateDisplay
                      date={task.endDate}
                      outputFormat="MMMM d, yyyy"
                    />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default TasksTable;
