import ChatWindow from "@/components/shared/inbox-page/chat-window";
import SearchBar from "@/components/shared/search/search-bar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="grid grid-cols-8 h-[calc(100vh-1.1rem)]">
      <aside className="flex flex-col col-span-2 border-r border-border p-4">
        <SearchBar isInbox entities={["students", "instructors"]} />
      </aside>
      <div className="col-span-6">{children}</div>
    </main>
  );
};

export default Layout;
