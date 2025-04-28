import SearchBar from "@/components/shared/search/search-bar";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <main className="grid grid-cols-8 gap-x-2 bg-secondary h-[calc(100vh-1.1rem)]">
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
      <div className="col-span-6 bg-background border border-border rounded-xl">
        <div className="flex flex-col">
          <header className="p-4 h-[72.8px] flex items-center border-b border-border">
            <Skeleton className="h-4 w-full" />
          </header>
          <div className="py-4 h-[calc(100vh-1rem-72.8px-64.8px)] overflow-y-hidden w-full px-4 flex flex-col gap-4">
            <Skeleton className="w-[55%] h-16" />
            <Skeleton className="w-[53%] h-16" />
            <Skeleton className="w-[30%] h-16 ml-auto" />
            <Skeleton className="w-[20%] h-16 ml-auto" />
            <Skeleton className="w-[20%] h-16" />
            <Skeleton className="w-[55%] h-16 ml-auto" />
            <Skeleton className="w-[10%] h-16" />
            <Skeleton className="w-[15%] h-16" />
            <Skeleton className="w-[40%] h-16 ml-auto" />
            <Skeleton className="w-[30%] h-16 ml-auto" />
          </div>
          <div className="flex h-[64.8px] items-center p-4 gap-2 border-t border-border">
            <Skeleton className="flex-1 h-4" />
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-16 h-4" />
          </div>
        </div>
      </div>
    </main>
  )
};

export default Loading;
