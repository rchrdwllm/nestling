import Image from "next/image";
import registerBg from "@/assets/register-bg.jpg";
import logoTextReversed from "@/assets/logo-text-reversed.png";
import RegisterSteps from "@/components/shared/register-page/register-steps";
import { getCurrentUser } from "@/lib/user";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const user = await getCurrentUser();

  if (user) return redirect(`/${user.role}-dashboard`);

  return (
    <main className="h-screen grid grid-cols-2 overflow-x-hidden">
      <Image
        priority
        src={registerBg}
        alt="Register Background"
        className="w-full h-screen absolute object-cover"
      />
      <div></div>
      <div className="z-[1] h-screen flex flex-col items-center pb-12 pt-4 px-20 gap-4">
        <Image src={logoTextReversed} className="w-44" alt="Logo Text" />
        <div className="w-full h-full bg-background rounded-xl shadow-xl">
          <RegisterSteps />
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
