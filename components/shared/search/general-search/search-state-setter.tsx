"use client";

import { useSearchStore } from "@/context/search-context";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

type SearchStateSetterProps = {
  searchResults: {
    data: any[];
    total: number;
    type:
      | "students"
      | "instructors"
      | "admins"
      | "courses"
      | "contents"
      | "projects"
      | "unknown";
  };
};

const SearchStateSetter = ({ searchResults }: SearchStateSetterProps) => {
  const { setSearchResults, setCurrentPage } = useSearchStore();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchResults) {
      setSearchResults(searchResults);

      // Set current page from URL params
      const pageParam = searchParams.get("page");
      const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
      setCurrentPage(currentPage);
    }
  }, [searchResults, setSearchResults, setCurrentPage, searchParams]);

  return null;
};

export default SearchStateSetter;
