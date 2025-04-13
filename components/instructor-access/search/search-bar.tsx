"use client";

import React, { useState } from "react";
import { Input } from "../../ui/input";
import { Search } from "lucide-react";
import SearchResults from "./search-results";
import { AnimatePresence } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { searchStudentsAndCourses } from "@/lib/search";
import { Course, User } from "@/types";
import { useCurrentUser } from "@/hooks/use-current-user";

const SearchBar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    students: User[];
    courses: Course[];
  }>({ students: [], courses: [] });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const user = useCurrentUser();

  const handleSearch = useDebouncedCallback(async (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
      const { students, courses } = await searchStudentsAndCourses(
        user.user.id,
        term
      );
      setSearchResults({
        students: students.map((student) => JSON.parse(student)),
        courses: courses.map((course) => JSON.parse(course)),
      });
    } else {
      params.delete("query");
      setSearchResults({ students: [], courses: [] });
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative">
      <Input
        Icon={Search}
        placeholder="Search"
        onChange={(e) => handleSearch(e.target.value)}
        onClick={() => setIsClicked(true)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <AnimatePresence>
        {isClicked && <SearchResults results={searchResults} />}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
