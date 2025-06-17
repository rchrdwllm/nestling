"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Search as SearchIcon } from "lucide-react";
import Search from "../general-search/search";
import { useSearchStore } from "@/context/search-context";
import { useEffect, useState } from "react";

type SearchBtnProps = {
  isInbox?: boolean;
};

const SearchBtn = ({ isInbox }: SearchBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setSearchResults, searchItemClicked, setSearchItemClicked } =
    useSearchStore();

  useEffect(() => {
    if (searchItemClicked) {
      setIsOpen(false);
      setSearchResults({
        data: [],
        total: 0,
        type: "unknown",
      });
      setSearchItemClicked(false);
    }
  }, [searchItemClicked]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(visible) => {
        if (!visible) {
          setSearchResults({
            data: [],
            total: 0,
            type: "unknown",
          });
        }

        setIsOpen(visible);
      }}
    >
      <TooltipProvider>
        <Tooltip delayDuration={250}>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <div
                className={cn(
                  "flex items-center cursor-pointer gap-2 shadow-sm justify-start rounded-lg border border-border px-3 h-10 transition-all group hover:border-border"
                )}
              >
                <SearchIcon
                  className={cn(
                    "size-4 transition-colors text-muted-foreground/65 group-hover:text-foreground"
                  )}
                />
                <p className="text-muted-foreground text-sm">Search</p>
              </div>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>Search</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            Use the search bar to find courses, instructors, or topics.
          </DialogDescription>
        </DialogHeader>
        <Search isInbox={isInbox} />
      </DialogContent>
    </Dialog>
  );
};

export default SearchBtn;
