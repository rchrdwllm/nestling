"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const ProjectsTable = ({ columns, data }: any) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter projects..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="w-full"
        />
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      <Card>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {/* <TableBody>
          {projects.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-muted-foreground"
              >
                No projects found
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
                    <DateDisplay
                      date={project.startDate}
                      outputFormat="MMMM d, yyyy"
                    />
                  </TableCell>
                  <TableCell>
                    <DateDisplay
                      date={project.endDate}
                      outputFormat="MMMM d, yyyy"
                    />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody> */}
        </Table>
      </Card>
    </div>
  );
};

export default ProjectsTable;
