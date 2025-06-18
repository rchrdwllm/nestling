import { useSearchStore } from "@/context/search-context";
import React from "react";
import StudentCard from "../student-card";
import InstructorCard from "../instructor-card";
import AdminCard from "../admin-card";
import CourseCard from "../course-card";
import ContentCard from "../content-card";
import ProjectCard from "../project-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SearchResultsProps = {
  isInbox?: boolean;
};

const SearchResults = ({ isInbox }: SearchResultsProps) => {
  const { data, type, total, currentPage, itemsPerPage } = useSearchStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(total / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  const generatePaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show ellipsis when there are many pages
      if (currentPage <= 3) {
        // Show pages 1-4 and ellipsis
        for (let i = 1; i <= 4; i++) {
          items.push(
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => handlePageChange(i)}
                isActive={currentPage === i}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
        items.push(<PaginationEllipsis key="ellipsis" />);
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (currentPage >= totalPages - 2) {
        // Show first page, ellipsis, and last 4 pages
        items.push(
          <PaginationItem key={1}>
            <PaginationLink onClick={() => handlePageChange(1)}>
              1
            </PaginationLink>
          </PaginationItem>
        );
        items.push(<PaginationEllipsis key="ellipsis" />);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          items.push(
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => handlePageChange(i)}
                isActive={currentPage === i}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      } else {
        // Show first page, ellipsis, current page ± 1, ellipsis, last page
        items.push(
          <PaginationItem key={1}>
            <PaginationLink onClick={() => handlePageChange(1)}>
              1
            </PaginationLink>
          </PaginationItem>
        );
        items.push(<PaginationEllipsis key="ellipsis1" />);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          items.push(
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => handlePageChange(i)}
                isActive={currentPage === i}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
        items.push(<PaginationEllipsis key="ellipsis2" />);
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  const renderResults = () => {
    switch (type) {
      case "students":
        return data.length ? (
          data.map((item) => (
            <StudentCard key={item.id} {...item} isInbox={isInbox} />
          ))
        ) : (
          <p className="py-8 text-muted-foreground text-center">
            No students found.
          </p>
        );
      case "instructors":
        return data.length ? (
          data.map((item) => (
            <InstructorCard key={item.id} {...item} isInbox={isInbox} />
          ))
        ) : (
          <p className="py-8 text-muted-foreground text-center">
            No instructors found.
          </p>
        );
      case "admins":
        return data.length ? (
          data.map((item) => (
            <AdminCard key={item.id} {...item} isInbox={isInbox} />
          ))
        ) : (
          <p className="py-8 text-muted-foreground text-center">
            No admins found.
          </p>
        );
      case "courses":
        return data.length ? (
          data.map((item) => <CourseCard key={item.id} {...item} />)
        ) : (
          <p className="py-8 text-muted-foreground text-center">
            No courses found.
          </p>
        );
      case "contents":
        return data.length ? (
          data.map((item) => <ContentCard key={item.id} {...item} />)
        ) : (
          <p className="py-8 text-muted-foreground text-center">
            No content found.
          </p>
        );
      case "projects":
        return data.length ? (
          data.map((item) => <ProjectCard key={item.id} {...item} />)
        ) : (
          <p className="py-8 text-muted-foreground text-center">
            No projects found.
          </p>
        );
      default:
        return (
          <p className="py-8 text-muted-foreground text-center">
            Start typing to search...
          </p>
        );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Results Count */}
      {total > 0 && (
        <div className="text-muted-foreground text-sm">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, total)} of {total} results
        </div>
      )}

      {/* Search Results */}
      <section className="min-h-[200px]">{renderResults()}</section>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {generatePaginationItems()}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                className={
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default SearchResults;
