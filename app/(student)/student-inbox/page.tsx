import ChatWindow from "@/components/shared/inbox-page/chat-window";
import SearchBar from "@/components/shared/search/search-bar";

const InstructorInbox = () => {
  return (
    <main className="grid grid-cols-8 h-full">
      <aside className="col-span-2 border-r border-border p-6 pt-8">
        <SearchBar isInbox entities={["students", "instructors"]} />
      </aside>
      <ChatWindow />
    </main>
  );
};

export default InstructorInbox;
