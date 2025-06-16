import SearchBar from "./search-bar";
import SearchResults from "./search-results";

type SearchProps = {
  isInbox?: boolean;
};

const Search = ({ isInbox }: SearchProps) => {
  return (
    <div className="flex flex-col gap-4">
      <SearchBar isInbox={isInbox} />
      <SearchResults isInbox={isInbox} />
    </div>
  );
};

export default Search;
