import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from "react";
import { User } from "@/types";
import StudentCard from "./student-card";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { searchStudents } from "@/lib/search";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const StudentSearchResults = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchResults, setSearchResults] = useState({
    students: [] as User[],
    totalStudents: 0,
  });
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const itemsPerPage = 10;

  const search = async (page: number) => {
    const query = searchParams.get("query") || "";

    const { students, totalStudents } = await searchStudents(
      query,
      page,
      itemsPerPage
    );

    setSearchResults({
      students: students.map((student) => JSON.parse(student)),
      totalStudents,
    });
  };

  useEffect(() => {
    const query = searchParams.get("query");

    if (query) {
      search(currentPage);
    } else {
      setSearchResults({ students: [], totalStudents: 0 });
    }
  }, [searchParams, currentPage]);

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

  const totalPages = Math.ceil(searchResults.totalStudents / itemsPerPage);

  if (!searchResults.students) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ScrollArea className="flex h-72 flex-col gap-1 items-start">
        {searchResults.students.length > 0 ? (
          searchResults.students.map((student: User) => (
            <StudentCard key={student.id} {...student} />
          ))
        ) : (
          <p className="py-32 text-muted-foreground text-center">
            No students found
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

export default StudentSearchResults;
