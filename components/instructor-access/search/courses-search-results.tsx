import { Course } from "@/types";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { searchCourses } from "@/lib/search";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useCurrentUser } from "@/hooks/use-current-user";
import CourseCard from "./course-card";

const CoursesSearchResults = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchResults, setSearchResults] = useState({
    courses: [] as Course[],
    totalCourses: 0,
  });
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const itemsPerPage = 10;
  const { user } = useCurrentUser();

  const search = async (page: number) => {
    const query = searchParams.get("query") || "";

    const { courses, totalCourses } = await searchCourses(
      user.id,
      query,
      page,
      itemsPerPage
    );

    setSearchResults({
      courses: courses.map((course) => JSON.parse(course)),
      totalCourses,
    });
  };

  useEffect(() => {
    const query = searchParams.get("query");

    if (query) {
      search(currentPage);
    } else {
      setSearchResults({ courses: [], totalCourses: 0 });
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

  const totalPages = Math.ceil(searchResults.totalCourses / itemsPerPage);

  return (
    <div>
      <div className="flex h-72 flex-col gap-1 items-start">
        {searchResults.courses.length > 0 ? (
          searchResults.courses.map((course: Course) => (
            <CourseCard key={course.id} {...course} />
          ))
        ) : (
          <p>No courses found</p>
        )}
      </div>
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

export default CoursesSearchResults;
