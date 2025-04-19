import Threads from "@/components/shared/inbox-page/threads";
import SearchBar from "@/components/shared/search/search-bar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="grid grid-cols-8 h-[calc(100vh-1.1rem)]">
      <aside className="flex flex-col col-span-2 border-r border-border">
        <div className="p-4 border-b border-border">
          <SearchBar isInbox entities={["students", "instructors"]} />
        </div>
        <Threads />
      </aside>
      <div className="col-span-6">{children}</div>
    </main>
  );
};

export default Layout;
