import Threads from "@/components/shared/inbox-page/threads";
import SearchBar from "@/components/shared/search/search-bar";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode, Suspense } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="grid grid-cols-8 gap-x-2 bg-secondary h-[calc(100vh-1.1rem)]">
      <aside className="flex flex-col col-span-2 border rounded-xl border-border bg-background">
        <div className="p-4 border-b border-border">
          <SearchBar isInbox entities={["students", "instructors"]} />
        </div>
        <Suspense fallback={
          <aside className="flex flex-col col-span-2 border rounded-xl border-border bg-background">
          <div className="p-4 border-b border-border">
            <SearchBar isInbox entities={["students", "instructors"]} />
          </div>
          <div className="overflow-y-hidden h-[calc(100vh-1rem-72.8px)]">
            <article className="p-4 border-b flex flex-col gap-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </article>
            <article className="p-4 border-b flex flex-col gap-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </article>
            <article className="p-4 border-b flex flex-col gap-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </article>
            <article className="p-4 border-b flex flex-col gap-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </article>
            <article className="p-4 border-b flex flex-col gap-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </article>
            <article className="p-4 border-b flex flex-col gap-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </article>
            <article className="p-4 border-b flex flex-col gap-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </article>
            <article className="p-4 border-b flex flex-col gap-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </article>
            <article className="p-4 border-b flex flex-col gap-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </article>
            <article className="p-4 border-b flex flex-col gap-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </article>
            <article className="p-4 border-b flex flex-col gap-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </article>
            <article className="p-4 border-b flex flex-col gap-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </article>
            <article className="p-4 border-b flex flex-col gap-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </article>
            <article className="p-4 border-b flex flex-col gap-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </article>
            <article className="p-4 border-b flex flex-col gap-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </article>
            <article className="p-4 border-b flex flex-col gap-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </article>
            <article className="p-4 border-b flex flex-col gap-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </article>
          </div>
        </aside>
        }></Suspense>
        <Threads />
      </aside>
      <div className="col-span-6 bg-background border border-border rounded-xl">
        {children}
      </div>
    </main>
  );
};

export default Layout;
