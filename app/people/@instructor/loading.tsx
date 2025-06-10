import { Skeleton } from "@/components/ui/skeleton";

const Loading = async () => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-9 w-28" />
        <hr />
      </div>
      <div className="">
        <Skeleton className="h-10 w-full" />
        <div className="mt-6 flex flex-col gap-4">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-4 w-64" />
          <section className="flex justify-between items-center">
            <Skeleton className="h-10 w-full max-w-sm" />
            <div className="flex items-center gap-4">
              <Skeleton className="w-28 h-10" />
              <Skeleton className="w-28 h-10" />
            </div>
          </section>
          <Skeleton className="w-full h-80" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
