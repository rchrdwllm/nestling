import { Content, Project } from "@/types";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { searchContents, searchProjects } from "@/lib/search";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import ContentCard from "@/components/shared/search/content-card";
import { useCurrentUser } from "@/hooks/use-current-user";
import ProjectCard from "./project-card";

const ProjectsSearchResults = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchResults, setSearchResults] = useState({
    projects: [] as Project[],
    totalProjects: 0,
  });
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;
  const { user } = useCurrentUser();

  const search = async (page: number) => {
    setIsLoading(true);
    const query = searchParams.get("query") || "";

    const { projects, totalProjects } = await searchProjects(
      user.role,
      user.id,
      query,
      page,
      itemsPerPage
    );

    setSearchResults({
      projects: projects.map((project) => JSON.parse(project)),
      totalProjects,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    const query = searchParams.get("query");

    if (query) {
      search(currentPage);
    } else {
      setSearchResults({ projects: [], totalProjects: 0 });
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

  const totalPages = Math.ceil(searchResults.totalProjects / itemsPerPage);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ScrollArea className="flex flex-col items-start gap-1">
        {searchResults.projects.length > 0 ? (
          <div className="flex flex-col gap-1 pt-2">
            {searchResults.projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        ) : (
          <p className="py-32 text-muted-foreground text-center">
            No projects found
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

export default ProjectsSearchResults;
