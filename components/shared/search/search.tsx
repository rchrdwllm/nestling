import { ScrollArea } from "@/components/ui/scroll-area";
import SearchBar from "./search-bar";
import SearchResults from "./search-results";

const Search = () => {
  return (
    <div className="flex flex-col gap-4">
      <SearchBar />
      <ScrollArea>
        <SearchResults />
      </ScrollArea>
    </div>
  );
};

export default Search;
