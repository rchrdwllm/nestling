import SearchBar from "./search-bar";

type SearchProps = {
  query: string;
  currentPage: number;
  tab: "students" | "courses" | "projects";
};

const Search = async ({ query, currentPage, tab }: SearchProps) => {
  return (
    <>
      <SearchBar />
    </>
  );
};

export default Search;
