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
import {
  getArchivedTickets,
  getClosedTickets,
  getInProgressTickets,
  getOpenTickets,
} from "@/lib/ticket";
import { Ticket } from "@/types";
import { toast } from "sonner";

type TicketsTableProps = {
  columns: any[];
  data: any[];
  lastDocId?: string | undefined;
  hasMore?: boolean;
  tab?: "open" | "in-progress" | "closed" | "archived";
};

const TicketsTable = ({
  columns,
  data,
  lastDocId,
  hasMore,
  tab = "open",
}: TicketsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [tickets, setTickets] = useState<Ticket[]>(data);
  const [lastDocIdState, setLastDocIdState] = useState<string | undefined>(
    lastDocId
  );
  const [hasMoreTickets, setHasMoreTickets] = useState(hasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [cursorStack, setCursorStack] = useState<string[]>([]);

  useEffect(() => {
    setLastDocIdState(lastDocId);
    setHasMoreTickets(hasMore);
    setTickets(data);
  }, [hasMore, lastDocId, data]);

  const table = useReactTable({
    data: tickets,
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

  const handleGoPrevPage = async () => {
    setIsLoading(true);

    const prevCursor = cursorStack.pop();

    setCursorStack(cursorStack);

    let ticketsData: Ticket[] | undefined;
    let newLastDocId: string | undefined;
    let hasMore: boolean | undefined;
    let error: string | undefined | unknown;

    switch (tab) {
      case "open":
        ({
          success: ticketsData,
          lastDocId: newLastDocId,
          hasMore,
          error,
        } = await getOpenTickets(5, prevCursor));
        break;
      case "in-progress":
        ({
          success: ticketsData,
          lastDocId: newLastDocId,
          hasMore,
          error,
        } = await getInProgressTickets(5, prevCursor));
        break;
      case "closed":
        ({
          success: ticketsData,
          lastDocId: newLastDocId,
          hasMore,
        } = await getClosedTickets(5, prevCursor));
        break;
      case "archived":
        ({
          success: ticketsData,
          lastDocId: newLastDocId,
          hasMore,
          error,
        } = await getArchivedTickets(5, prevCursor));
        break;
      default:
        console.error("Unknown tab:", tab);
        setIsLoading(false);
        return;
    }

    if (error || !ticketsData) {
      console.error("Error fetching next page of tickets:", error);
      toast.error("Error fetching next page of tickets: " + error);

      setIsLoading(false);

      return;
    }

    if (newLastDocId) {
      setLastDocIdState(newLastDocId);
    }

    setTickets(ticketsData);
    setHasMoreTickets(hasMore);

    setIsLoading(false);
  };

  const handleGoNextPage = async () => {
    setIsLoading(true);

    if (lastDocId) {
      let ticketsData: Ticket[] | undefined;
      let newLastDocId: string | undefined;
      let hasMore: boolean | undefined;
      let error: string | undefined | unknown;

      if (!cursorStack.length) {
        setCursorStack((prev) => [...prev, ""]);
      } else {
        setCursorStack((prev) => [...prev, lastDocIdState || ""]);
      }

      switch (tab) {
        case "open":
          ({
            success: ticketsData,
            lastDocId: newLastDocId,
            hasMore,
            error,
          } = await getOpenTickets(5, lastDocIdState));
          break;
        case "in-progress":
          ({
            success: ticketsData,
            lastDocId: newLastDocId,
            hasMore,
            error,
          } = await getInProgressTickets(5, lastDocIdState));
          break;
        case "closed":
          ({
            success: ticketsData,
            lastDocId: newLastDocId,
            hasMore,
          } = await getClosedTickets(5, lastDocIdState));
          break;
        case "archived":
          ({
            success: ticketsData,
            lastDocId: newLastDocId,
            hasMore,
            error,
          } = await getArchivedTickets(5, lastDocIdState));
          break;
        default:
          console.error("Unknown tab:", tab);
          setIsLoading(false);
          return;
      }

      if (error || !ticketsData) {
        console.error("Error fetching next page of tickets:", error);
        toast.error("Error fetching next page of tickets: " + error);

        setIsLoading(false);

        return;
      }

      if (newLastDocId) {
        setLastDocIdState(newLastDocId);
      }

      setTickets(ticketsData);
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
            disabled={!cursorStack.length}
            onClick={handleGoPrevPage}
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
