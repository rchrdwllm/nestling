import { ReactNode } from "react";
import { Button } from "../../ui/button";
import { Role } from "@/types";

type LoginRoleBtnProps = {
  role: Role;
  setRole: (role: Role) => void;
  children: ReactNode;
  onClick: () => void;
};

const LoginRoleBtn = ({
  role,
  setRole,
  children,
  onClick,
}: LoginRoleBtnProps) => {
  return (
    <Button
      onClick={() => {
        setRole(role);
        onClick();
      }}
      whileTap={{ scale: 0.95 }}
      className="relative flex rounded-xl flex-col border-2 gap-3 h-auto items-center aspect-square w-[150px] transition-colors group hover:bg-primary hover:text-primary-foreground"
      variant="outline"
    >
      {children}
    </Button>
  );
};

export default LoginRoleBtn;
