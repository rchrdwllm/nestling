import SearchBar from "@/components/instructor-access/search/search-bar";

const InstructorInboxPage = () => {
  return (
    <main className="grid grid-cols-8 h-full">
      <aside className="col-span-2 border-r border-border p-6 pt-8">
        <SearchBar isInbox entities={["students", "instructors"]} />
      </aside>
      <div></div>
    </main>
  );
};

export default InstructorInboxPage;
