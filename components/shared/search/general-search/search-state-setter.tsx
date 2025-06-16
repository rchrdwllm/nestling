"use client";

import { useSearchStore } from "@/context/search-context";
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
  const { setSearchResults } = useSearchStore();

  useEffect(() => {
    if (searchResults) {
      setSearchResults(searchResults);
    }
  }, [searchResults, setSearchResults]);

  return null;
};

export default SearchStateSetter;
