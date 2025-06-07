import Help from "@/components/shared/help-page/faq";
import UserManual from "@/components/shared/help-page/user-manual";

const HelpPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 700));

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Help</h1>
        <hr />
      </div>
      <UserManual />
      <Help />
    </div>
  );
};

export default HelpPage;
