import { getReadNotifs } from "@/lib/notification";
import { getOptimisticUser } from "@/lib/user";
import NotifCard from "./notif-card";

const ReadNotifs = async () => {
  const user = await getOptimisticUser();
  const { success: readNotifs, error: readNotifsError } = await getReadNotifs(
    user.id
  );

  if (readNotifsError || !readNotifs) {
    console.error("Error fetching read notifications:", readNotifsError);

    return <div>Error loading notifications, please try again later.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {readNotifs.map((notif) => (
        <NotifCard key={notif.id} {...notif} />
      ))}
    </div>
  );
};

export default ReadNotifs;
