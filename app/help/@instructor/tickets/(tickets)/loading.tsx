import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-9 w-60" />
        </div>
        <hr />
      </div>
      <section className="flex flex-col gap-4">
        <Skeleton className="w-full h-10" />
        <div className="flex justify-between items-center">
          <Skeleton className="w-full h-10 max-w-md" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-[86px]" />
            <Skeleton className="h-10 w-[58px]" />
            <Skeleton className="h-10 w-[85px]" />
          </div>
        </div>
        <Skeleton className="w-full h-[400px]" />
      </section>
    </div>
  );
};

export default Loading;
