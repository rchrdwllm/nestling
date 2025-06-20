import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Skeleton className="w-60 h-9" />
          <Skeleton className="w-36 h-9" />
        </div>
        <hr />
      </div>
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Skeleton className="w-full max-w-sm h-10" />
          <div className="flex items-center gap-4">
            <Skeleton className="w-28 h-10" />
            <Skeleton className="w-28 h-10" />
          </div>
        </div>
        <Skeleton className="w-full h-96" />
      </section>
    </div>
  );
};

export default Loading;
