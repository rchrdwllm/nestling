import Threads from "@/components/shared/inbox-page/threads";
import SearchBtn from "@/components/shared/search/inbox-search/search-btn";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentUser } from "@/lib/user";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();

  if (!user) return redirect("/api/auth/signin");

  return (
    <main className="gap-x-2 grid grid-cols-8 bg-secondary h-[calc(100vh-1.1rem)]">
      <aside className="flex flex-col col-span-2 bg-background border border-border rounded-xl">
        <div className="p-4 border-b border-border">
          <SearchBtn isInbox />
        </div>
        <Suspense
          fallback={
            <aside className="flex flex-col col-span-2 bg-background border border-border rounded-xl">
              <div className="p-4 border-b border-border">
                <SearchBtn isInbox />
              </div>
              <div className="h-[calc(100vh-1rem-72.8px)] overflow-y-hidden">
                <article className="flex flex-col gap-2 p-4 border-b">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                </article>
                <article className="flex flex-col gap-2 p-4 border-b">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                </article>
                <article className="flex flex-col gap-2 p-4 border-b">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                </article>
                <article className="flex flex-col gap-2 p-4 border-b">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                </article>
                <article className="flex flex-col gap-2 p-4 border-b">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                </article>
                <article className="flex flex-col gap-2 p-4 border-b">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                </article>
                <article className="flex flex-col gap-2 p-4 border-b">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                </article>
                <article className="flex flex-col gap-2 p-4 border-b">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                </article>
                <article className="flex flex-col gap-2 p-4 border-b">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                </article>
                <article className="flex flex-col gap-2 p-4 border-b">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                </article>
                <article className="flex flex-col gap-2 p-4 border-b">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                </article>
                <article className="flex flex-col gap-2 p-4 border-b">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                </article>
                <article className="flex flex-col gap-2 p-4 border-b">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                </article>
                <article className="flex flex-col gap-2 p-4 border-b">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                </article>
                <article className="flex flex-col gap-2 p-4 border-b">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                </article>
                <article className="flex flex-col gap-2 p-4 border-b">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                </article>
                <article className="flex flex-col gap-2 p-4 border-b">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                </article>
              </div>
            </aside>
          }
        ></Suspense>
        <Threads />
      </aside>
      <div className="col-span-6 bg-background border border-border rounded-xl">
        {children}
      </div>
    </main>
  );
};

export default Layout;
