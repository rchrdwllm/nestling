import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Role } from "@/types";

type RegisterRoleBtnProps = {
  role: Role;
  setRole: (role: Role) => void;
  children: ReactNode;
  onClick: () => void;
};

const RegisterRoleBtn = ({
  role,
  setRole,
  children,
  onClick,
}: RegisterRoleBtnProps) => {
  return (
    <Button
      onClick={() => {
        setRole(role);
        onClick();
      }}
      whileTap={{ scale: 0.95 }}
      className="relative flex rounded-xl px-8 border-2 py-4 gap-2 h-auto items-center w-auto transition-colors group hover:bg-primary hover:text-primary-foreground"
      variant="outline"
    >
      {children}
    </Button>
  );
};

export default RegisterRoleBtn;
