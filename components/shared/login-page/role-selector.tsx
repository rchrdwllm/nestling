import { GraduationCap, BookOpen, Code } from "lucide-react";
import LoginRoleBtn from "./login-role-btn";
import { Role } from "@/types";
import MotionWrapper from "../../wrappers/motion-wrapper";
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
      transition={{ duration: 0.5, ease: easings.easeOutExpo as any }}
      className="flex flex-col items-center gap-8 -mt-8"
    >
      <div>
        <h1 className="font-semibold text-2xl text-center">Select a role</h1>
        <p className="mx-auto w-2/3 text-muted-foreground text-sm text-center">
          Please choose whether you are a student, an instructor, or an admin
        </p>
      </div>
      <div className="flex gap-8">
        <LoginRoleBtn onClick={setStep} role="student" setRole={setRole}>
          <GraduationCap className="!size-12 group-hover:scale-[0.85] transition-transform group-hover:-translate-y-2" />
          <span className="bottom-0 absolute opacity-0 group-hover:opacity-100 text-primary-foreground text-sm transition-all translate-y-full group-hover:-translate-y-5">
            Student
          </span>
        </LoginRoleBtn>
        <LoginRoleBtn onClick={setStep} role="instructor" setRole={setRole}>
          <BookOpen className="!size-12 group-hover:scale-[0.85] transition-transform group-hover:-translate-y-2" />
          <span className="bottom-0 absolute opacity-0 group-hover:opacity-100 text-primary-foreground text-sm transition-all translate-y-full group-hover:-translate-y-5">
            Instructor
          </span>
        </LoginRoleBtn>
        <LoginRoleBtn onClick={setStep} role="admin" setRole={setRole}>
          <Code className="!size-12 group-hover:scale-[0.85] transition-transform group-hover:-translate-y-2" />
          <span className="bottom-0 absolute opacity-0 group-hover:opacity-100 text-primary-foreground text-sm transition-all translate-y-full group-hover:-translate-y-5">
            Admin
          </span>
        </LoginRoleBtn>
      </div>
    </MotionWrapper>
  );
};

export default RoleSelector;
