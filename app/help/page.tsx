import React from "react";
import Help from "@/components/shared/help-page/faq";
import UserManual from "@/components/shared/help-page/user-manual";

const HelpPage = () => {
  return (
    <div className="flex flex-col gap-10 p-6">
      <UserManual />      
      <Help />
    </div>
  );
};

export default HelpPage;
