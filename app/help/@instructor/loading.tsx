import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-9 w-36" />
        <hr />
      </div>
      <section className="flex flex-col gap-8">
        <Skeleton className="h-7 w-44" />
        <div className="grid grid-cols-4 gap-8">
          <Skeleton className="w-full h-[247px]" />
          <Skeleton className="w-full h-[247px]" />
          <Skeleton className="w-full h-[247px]" />
          <Skeleton className="w-full h-[247px]" />
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <Skeleton className="h-7 w-96" />
        <div className="py-4">
          <Skeleton className="w-full h-7" />
        </div>
        <div className="py-4">
          <Skeleton className="w-full h-7" />
        </div>
        <div className="py-4">
          <Skeleton className="w-full h-7" />
        </div>
        <div className="py-4">
          <Skeleton className="w-full h-7" />
        </div>
        <div className="py-4">
          <Skeleton className="w-full h-7" />
        </div>
      </section>
    </div>
  );
};

export default Loading;
