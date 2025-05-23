import { Content } from "@/types";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { searchContents } from "@/lib/search";
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

const ContentsSearchResults = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchResults, setSearchResults] = useState({
    contents: [] as Content[],
    totalContents: 0,
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

    const { contents, totalContents } = await searchContents(
      user.role,
      user.id,
      query,
      page,
      itemsPerPage
    );

    setSearchResults({
      contents: contents.map((content) => JSON.parse(content)),
      totalContents,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    const query = searchParams.get("query");

    if (query) {
      search(currentPage);
    } else {
      setSearchResults({ contents: [], totalContents: 0 });
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

  const totalPages = Math.ceil(searchResults.totalContents / itemsPerPage);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ScrollArea className="flex h-72 flex-col gap-1 items-start">
        {searchResults.contents.length > 0 ? (
          <div className="flex flex-col gap-1 pt-2">
            {searchResults.contents.map((content) => (
              <ContentCard key={content.id} {...content} />
            ))}
          </div>
        ) : (
          <p className="py-32 text-muted-foreground text-center">
            No courses found
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

export default ContentsSearchResults;
