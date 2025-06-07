import Help from "@/components/shared/help-page/faq";
import UserManual from "@/components/shared/help-page/user-manual";

// Artificial delay for loading screen aesthetics
const HelpPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 700));

  return (
    <div className="flex flex-col gap-10 p-6">
      <UserManual />
      <Help />
    </div>
  );
};

export default HelpPage;
