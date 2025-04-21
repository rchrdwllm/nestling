"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from "react";
import { User } from "@/types";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { searchInstructors } from "@/lib/search";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import InstructorCard from "./instructor-card";

type InstructorSearchResultsProps = {
  isInbox?: boolean;
};

const InstructorSearchResults = ({ isInbox }: InstructorSearchResultsProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchResults, setSearchResults] = useState({
    instructors: [] as User[],
    totalInstructors: 0,
  });
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  const search = async (page: number) => {
    setIsLoading(true);
    const query = searchParams.get("query") || "";

    const { instructors, totalInstructors } = await searchInstructors(
      query,
      page,
      itemsPerPage
    );

    setSearchResults({
      instructors: instructors.map((instructor) => JSON.parse(instructor)),
      totalInstructors,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    const query = searchParams.get("query");

    if (query) {
      search(currentPage);
    } else {
      setSearchResults({ instructors: [], totalInstructors: 0 });
    }
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    const params = new URLSearchParams(searchParams);

    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const totalPages = Math.ceil(searchResults.totalInstructors / itemsPerPage);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!searchResults.instructors) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ScrollArea className="flex h-72 flex-col gap-1 items-start">
        {searchResults.instructors.length > 0 ? (
          searchResults.instructors.map((instructor: User) => (
            <InstructorCard
              isInbox={isInbox}
              key={instructor.id}
              {...instructor}
            />
          ))
        ) : (
          <p className="py-32 text-muted-foreground text-center">
            No instructors found
          </p>
        )}
      </ScrollArea>
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationPrevious
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              isActive={currentPage !== 1}
            />
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationNext
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, totalPages))
              }
              isActive={currentPage !== totalPages}
            />
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default InstructorSearchResults;
