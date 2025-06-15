import { Skeleton } from "@/components/ui/skeleton";

const Loading = async () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4">
        <Skeleton className="w-28 h-9" />
        <hr />
      </div>
      <div className="">
        <Skeleton className="w-full h-10" />
        <div className="flex flex-col gap-4 mt-6">
          <Skeleton className="w-32 h-7" />
          <Skeleton className="w-64 h-4" />
          <section className="flex justify-between items-center">
            <Skeleton className="w-full max-w-sm h-10" />
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
