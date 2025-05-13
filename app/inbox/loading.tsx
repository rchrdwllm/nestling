import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col">
      <header className="p-4 h-[72.8px] flex items-center border-b border-border">
        <Skeleton className="h-4 w-full" />
      </header>
      <div className="py-4 h-[calc(100vh-1rem-72.8px-64.8px)] overflow-y-hidden w-full px-4 flex flex-col gap-4">
        <Skeleton className="w-[55%] h-16" />
        <Skeleton className="w-[53%] h-16" />
        <Skeleton className="w-[30%] h-16 ml-auto" />
        <Skeleton className="w-[20%] h-16 ml-auto" />
        <Skeleton className="w-[20%] h-16" />
        <Skeleton className="w-[55%] h-16 ml-auto" />
        <Skeleton className="w-[10%] h-16" />
        <Skeleton className="w-[15%] h-16" />
        <Skeleton className="w-[40%] h-16 ml-auto" />
        <Skeleton className="w-[30%] h-16 ml-auto" />
      </div>
      <div className="flex h-[64.8px] items-center p-4 gap-2 border-t border-border">
        <Skeleton className="flex-1 h-4" />
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-16 h-4" />
      </div>
    </div>
  );
};

export default Loading;
