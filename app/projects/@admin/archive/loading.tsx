import { Skeleton } from "@/components/ui/skeleton";

const Loading = async () => {
  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Archived Tasks</h1>
        <hr />
      </div>
      <div>
        <Skeleton className="w-full h-32" />
      </div>
    </div>
  );
};

export default Loading;
