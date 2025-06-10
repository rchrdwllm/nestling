import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <div>
        <div className="flex flex-col gap-8 items-center">
          <Skeleton className="size-32 rounded-full" />
          <div className="flex flex-col gap-4">
            <Skeleton className="w-56 h-9" />
            <Skeleton className="w-16 h-4" />
          </div>
          <Skeleton className="w-[149px] h-[93px]" />
          <div className="flex flex-col gap-4 items-start">
            <Skeleton className="h-6 w-[315px]" />
            <Skeleton className="h-6 w-[315px]" />
            <Skeleton className="h-6 w-[315px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
