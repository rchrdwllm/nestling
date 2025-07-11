import { GraduationCap, BookOpen, Code } from "lucide-react";
import RegisterRoleBtn from "./register-role-btn";
import { Role } from "@/types";
import MotionWrapper from "@/components/wrappers/motion-wrapper";
import { easings } from "@/constants/animations";
import Image from "next/image";
import nestling from "@/assets/nestling.png";

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
      className="flex flex-col items-center gap-8"
    >
      <div
        key="role-selector-header"
        className="flex flex-col items-center gap-4"
      >
        <Image
          src={nestling}
          alt="Nestling logo"
          className="h-[50px] object-contain"
        />
        <div className="text-center">
          <h1 className="font-semibold text-2xl text-center">Select a role</h1>
          <p className="mx-auto w-2/3 text-muted-foreground text-sm text-center">
            Please choose whether you are a student, an instructor, or an admin
          </p>
        </div>
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
