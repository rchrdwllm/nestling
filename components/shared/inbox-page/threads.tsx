import { getUserThreads } from "@/lib/thread";
import ThreadCard from "./thread-card";
import { getOptimisticUser } from "@/lib/user";

const Threads = async () => {
  const user = await getOptimisticUser();
  const { success: threads, error } = await getUserThreads(user.id);

  if (error) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <h1 className="text-muted-foreground">{JSON.stringify(error)}</h1>
      </div>
    );
  }

  if (!threads)
    return (
      <div className="flex-1 flex justify-center items-center">
        <h1 className="text-muted-foreground">No threads available</h1>
      </div>
    );

  return (
    <div>
      {threads.map((thread) => (
        <ThreadCard key={thread.id} {...thread} />
      ))}
    </div>
  );
};

export default Threads;
