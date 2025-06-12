import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const Loading = () => {
  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4">
          <Skeleton className="h-9 w-60" />
          <Skeleton className="h-10 w-[140px]" />
        </div>
        <hr />
      </div>
      <section className="flex flex-col gap-4">
        <Card className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="size-10 rounded-full" />
            <div>
              <Skeleton className="h-7 w-64" />
              <Skeleton className="w-80 h-4" />
            </div>
          </div>
          <div className="ml-14 flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <Skeleton className="h-[21px] w-[55px] rounded-full" />
              <Skeleton className="h-[21px] w-[55px] rounded-full" />
              <Skeleton className="h-[21px] w-[55px] rounded-full" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton />
              <Skeleton />
            </div>
          </div>
        </Card>
        <Card className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="size-10 rounded-full" />
            <div>
              <Skeleton className="h-7 w-64" />
              <Skeleton className="w-80 h-4" />
            </div>
          </div>
          <div className="ml-14 flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <Skeleton className="h-[21px] w-[55px] rounded-full" />
              <Skeleton className="h-[21px] w-[55px] rounded-full" />
              <Skeleton className="h-[21px] w-[55px] rounded-full" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton />
              <Skeleton />
            </div>
          </div>
        </Card>
        <Card className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="size-10 rounded-full" />
            <div>
              <Skeleton className="h-7 w-64" />
              <Skeleton className="w-80 h-4" />
            </div>
          </div>
          <div className="ml-14 flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <Skeleton className="h-[21px] w-[55px] rounded-full" />
              <Skeleton className="h-[21px] w-[55px] rounded-full" />
              <Skeleton className="h-[21px] w-[55px] rounded-full" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton />
              <Skeleton />
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Loading;
