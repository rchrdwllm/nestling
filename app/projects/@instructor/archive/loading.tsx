import { Skeleton } from "@/components/ui/skeleton";

const Loading = async () => {
  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Archived Projects</h1>
        <hr />
      </div>
      <section className="col-span-2 flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4">
          <Skeleton className="w-36 h-10 mr-auto" />
          <Skeleton className="w-20 h-10" />
          <Skeleton className="w-20 h-10" />
        </div>
        <Skeleton className="w-full h-40" />
      </section>
    </div>
  );
};

export default Loading;
