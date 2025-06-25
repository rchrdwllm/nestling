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
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { getOpenTickets } from "@/lib/ticket";
import { Ticket } from "@/types";
import { toast } from "sonner";

type TicketsTableProps = {
  columns: any[];
  data: any[];
  lastDocId?: string | undefined;
  hasMore?: boolean;
};

const TicketsTable = ({
  columns,
  data,
  lastDocId,
  hasMore,
}: TicketsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [showAll, setShowAll] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [openTickets, setOpenTickets] = useState<Ticket[]>(data);
  const [lastDocIdState, setLastDocIdState] = useState<string | undefined>(
    lastDocId
  );
  const [hasMoreTickets, setHasMoreTickets] = useState(hasMore);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLastDocIdState(lastDocId);
    setHasMoreTickets(hasMore);
    setOpenTickets(data);

    console.log({
      lastDocId,
      hasMore,
      data,
    });
  }, [hasMore, lastDocId, data]);

  const table = useReactTable({
    data: openTickets,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  const handleGoNextPage = async () => {
    setIsLoading(true);

    if (lastDocId) {
      const { lastDocId, hasMore, success, error } = await getOpenTickets(
        5,
        lastDocIdState
      );

      if (error || !success) {
        console.error("Error fetching next page of tickets:", error);
        toast.error("Error fetching next page of tickets: " + error);

        setIsLoading(false);

        return;
      }

      if (lastDocId) {
        setLastDocIdState(lastDocId);
      }

      setOpenTickets(success);
      setHasMoreTickets(hasMore);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Filter tickets"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="w-full max-w-md"
        />
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage() || showAll}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={!hasMoreTickets || isLoading}
            onClick={handleGoNextPage}
          >
            Next
          </Button>
          <Button variant="outline" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show less" : "Show all"}
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
        </Table>
      </Card>
    </div>
  );
};

export default TicketsTable;
