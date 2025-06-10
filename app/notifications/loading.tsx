import { Skeleton } from "@/components/ui/skeleton";

const NotificationsPage = () => {
  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-9 w-64" />
        <hr />
      </div>
      <section className="flex items-center justify-between mb-4">
        <Skeleton className="w-96 h-10" />
        <Skeleton className="w-[90px] h-10" />
      </section>
    </div>
  );
};

export default NotificationsPage;
