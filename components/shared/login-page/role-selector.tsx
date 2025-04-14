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
      transition={{ duration: 0.5, ease: easings.easeOutExpo }}
      className="flex flex-col gap-8 items-center -mt-8"
    >
      <div>
        <h1 className="font-semibold text-2xl text-center">Select a role</h1>
        <p className="text-muted-foreground w-2/3 text-center mx-auto text-sm">
          Please choose whether you are a student, an instructor, or an admin
        </p>
      </div>
      <div className="flex gap-8">
        <LoginRoleBtn onClick={setStep} role="student" setRole={setRole}>
          <GraduationCap className="!size-12 transition-transform group-hover:scale-[0.85] group-hover:-translate-y-2" />
          <span className="absolute bottom-0 text-sm text-primary-foreground opacity-0 translate-y-full transition-all group-hover:opacity-100 group-hover:-translate-y-5">
            Student
          </span>
        </LoginRoleBtn>
        <LoginRoleBtn onClick={setStep} role="instructor" setRole={setRole}>
          <BookOpen className="!size-12 transition-transform group-hover:scale-[0.85] group-hover:-translate-y-2" />
          <span className="absolute bottom-0 text-sm text-primary-foreground opacity-0 translate-y-full transition-all group-hover:opacity-100 group-hover:-translate-y-5">
            Instructor
          </span>
        </LoginRoleBtn>
        <LoginRoleBtn onClick={setStep} role="admin" setRole={setRole}>
          <Code className="!size-12 transition-transform group-hover:scale-[0.85] group-hover:-translate-y-2" />
          <span className="absolute bottom-0 text-sm text-primary-foreground opacity-0 translate-y-full transition-all group-hover:opacity-100 group-hover:-translate-y-5">
            Admin
          </span>
        </LoginRoleBtn>
      </div>
    </MotionWrapper>
  );
};

export default RoleSelector;
