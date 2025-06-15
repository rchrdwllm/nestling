import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const NotificationsPage = () => {
  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex flex-col gap-4">
        <Skeleton className="w-64 h-9" />
        <hr />
      </div>
      <section className="flex justify-between items-center mb-4">
        <Skeleton className="w-96 h-10" />
        <Skeleton className="w-[90px] h-10" />
      </section>
      <Card className="flex justify-between items-center p-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-72 h-7" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-40 h-3.5" />
        </div>
      </Card>
    </div>
  );
};

export default NotificationsPage;
