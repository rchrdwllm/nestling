import { GraduationCap, BookOpen, Code } from "lucide-react";
import RegisterRoleBtn from "./register-role-btn";
import { Role } from "@/types";
import MotionWrapper from "@/components/wrappers/motion-wrapper";
import { easings } from "@/constants/animations";

type RoleSelectorProps = {
  setRole: (role: Role) => void;
  setStep: () => void;
};

const RoleSelector = ({ setRole, setStep }: RoleSelectorProps) => {
  return (
    <MotionWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: easings.easeOutExpo }}
      className="flex flex-col gap-8 items-center -mt-8"
    >
      <div>
        <h1 className="font-semibold text-2xl text-center">Select a role</h1>
        <p className="text-muted-foreground w-2/3 text-center mx-auto text-sm">
          Please choose whether you are a student, an instructor, or an admin
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <RegisterRoleBtn onClick={setStep} role="student" setRole={setRole}>
          <GraduationCap />
          <span>I am a student</span>
        </RegisterRoleBtn>
        <RegisterRoleBtn onClick={setStep} role="instructor" setRole={setRole}>
          <BookOpen />
          <span>I am an instructor</span>
        </RegisterRoleBtn>
        <RegisterRoleBtn onClick={setStep} role="admin" setRole={setRole}>
          <Code />
          <span>I am an admin</span>
        </RegisterRoleBtn>
      </div>
    </MotionWrapper>
  );
};

export default RoleSelector;
