import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <Skeleton className="flex flex-col items-center w-full px-2 py-10">
      <Skeleton className="h-12 w-2/3 max-w-xl mb-4" />
      <Skeleton className="h-8 w-1/2 max-w-lg mb-4" />
      <Skeleton className="h-5 w-3/4 max-w-2xl mb-10" />
      <Skeleton className="h-5 w-2/3 max-w-xl mb-10" />
      {/* Top row of cards skeleton */}
      <Skeleton className="w-full max-w-4xl flex flex-row justify-center gap-8 mb-8">
        {[...Array(3)].map((_, i) => (
          <Skeleton
            key={i}
            className="w-full min-w-[260px] max-w-[320px] h-[120px]-2xl"
          />
        ))}
      </Skeleton>
      {/* Bottom row of cards skeleton */}
      <Skeleton className="w-full max-w-2xl flex flex-row justify-center gap-8 mb-12">
        {[...Array(2)].map((_, i) => (
          <Skeleton
            key={i}
            className="w-full min-w-[260px] max-w-[320px] h-[120px]-2xl"
          />
        ))}
      </Skeleton>
      {/* Mission & Vision skeleton */}
      <Skeleton className="w-full max-w-3xl flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
        {[...Array(2)].map((_, i) => (
          <Skeleton key={i} className="flex-1 flex flex-col items-center">
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-4 w-48 mb-2" />
            <Skeleton className="h-4 w-40" />
          </Skeleton>
        ))}
      </Skeleton>
      {/* Office Address & Map skeleton */}
      <Skeleton className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8 p-8 mt-4">
        <Skeleton className="flex-1 flex flex-col gap-2 min-w-[220px] items-center md:items-start">
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-40 mb-1" />
          <Skeleton className="h-4 w-56 mb-1" />
          <Skeleton className="h-4 w-32" />
        </Skeleton>
        <Skeleton className="flex-1 flex items-center justify-center min-w-[220px]">
          <Skeleton className="w-[320px] h-[220px]" />
        </Skeleton>
      </Skeleton>
    </Skeleton>
  );
};

export default Loading;
