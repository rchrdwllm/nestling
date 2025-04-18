import ChatWindow from "@/components/shared/inbox-page/chat-window";
import SearchBar from "@/components/shared/search/search-bar";

const InstructorInbox = () => {
  return (
    <main className="grid grid-cols-8 h-[calc(100vh-2rem)]">
      <aside className="col-span-2 border-r border-border p-4">
        <SearchBar isInbox entities={["students", "instructors"]} />
      </aside>
      <div className="col-span-6">
        <ChatWindow />
      </div>
    </main>
  );
};

export default InstructorInbox;
