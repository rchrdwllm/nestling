import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="h-full justify-center items-center">
      <div>
        <div className="flex flex-col gap-8 items-center">
          <Skeleton className="size-32 rounded-full" />
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
