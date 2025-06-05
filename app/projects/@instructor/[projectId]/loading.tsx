import { Skeleton } from "@/components/ui/skeleton";

const Loading = async () => {
  return (
    <>
      <div className="p-6 flex flex-col gap-8">
        <section className="flex flex-col gap-4">
          <div className="flex items-stretch justify-between gap-2">
            <Skeleton className="h-10 w-28" />
            <div className="flex items-center gap-4 ml-auto">
              <Skeleton className="h-10 w-9" />
              <Skeleton className="h-10 w-9" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
          <hr />
        </section>
        <section className="flex flex-col gap-6">
          <Skeleton className="w-[500px] h-6" />
          <Skeleton className="w-[500px] h-6" />
          <Skeleton className="w-[500px] h-6" />
          <Skeleton className="w-[500px] h-6" />
          <Skeleton className="w-[500px] h-6" />
          <Skeleton className="w-[500px] h-6" />
        </section>
        <Skeleton className="h-7 w-40" />
        <section>
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-38" />
            <Skeleton className="h-10 w-20" />
          </div>
        </section>
        <Skeleton className="w-full h-32" />
        <Skeleton className="h-7 w-24" />
        <Skeleton className="w-full h-32" />
      </div>
    </>
  );
};

export default Loading;
