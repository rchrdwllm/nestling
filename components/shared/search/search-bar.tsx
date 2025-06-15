"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "../../ui/input";
import { Search } from "lucide-react";
import SearchResults from "./search-results";
import { AnimatePresence } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { ScrollArea } from "@/components/ui/scroll-area";

type SearchBarProps = {
  isInbox?: boolean;
};

const SearchBar = ({ isInbox = false }: SearchBarProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(
    async (term: string, page: number = 1) => {
      const params = new URLSearchParams(searchParams);

      if (term) {
        params.set("query", term);
        params.set("page", page.toString());
      } else {
        params.delete("query");
        params.delete("page");
      }

      replace(`${pathname}?${params.toString()}`);
    },
    200
  );

  useEffect(() => {
    const query = searchParams.get("query");

    if (query && isClicked) {
      handleSearch(query);
    }
  }, [isClicked]);

  return (
    <div className="relative">
      <Input
        Icon={Search}
        placeholder="Search"
        onChange={(e) => handleSearch(e.target.value)}
        onClick={() => setIsClicked(true)}
        defaultValue={searchParams.get("query") || ""}
      />
      {/* <AnimatePresence>
        {isClicked && <SearchResults isInbox={isInbox} entities={entities} />}
      </AnimatePresence> */}
    </div>
  );
};

export default SearchBar;
