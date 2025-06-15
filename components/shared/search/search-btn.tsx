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
import Search from "./search";

const SearchBtn = () => {
  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip delayDuration={250}>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <div
                className={cn(
                  "flex items-center cursor-pointer justify-center rounded-lg border border-background p-2 transition-all group hover:border-border"
                )}
              >
                <SearchIcon
                  className={cn(
                    "size-6 transition-colors text-muted-foreground/65 group-hover:text-foreground"
                  )}
                />
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
        <Search />
      </DialogContent>
    </Dialog>
  );
};

export default SearchBtn;
