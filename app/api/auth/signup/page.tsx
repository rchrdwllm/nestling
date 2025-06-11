import Image from "next/image";
import registerBg from "@/assets/register-bg.jpg";
import logoTextReversed from "@/assets/logo-text-reversed.png";
import RegisterSteps from "@/components/shared/register-page/register-steps";
import { getCurrentUser } from "@/lib/user";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const user = await getCurrentUser();

  if (user) return redirect(`/dashboard`);

  return (
    <main className="bg-primary items-center lg:items-start lg:bg-none h-screen grid grid-cols-2 overflow-x-hidden">
      <Image
        priority
        src={registerBg}
        alt="Register Background"
        className="hidden lg:block w-full h-screen absolute object-cover"
      />
      <div className="hidden lg:block"></div>
      <div className="z-[1] col-span-2 lg:col-span-1 min-h-screen flex flex-col items-center pb-12 pt-4 px-4 lg:px-20 gap-4">
        <Image src={logoTextReversed} className="w-44" alt="Logo Text" />
        <div className="flex-1 flex items-center justify-center w-full h-full bg-background rounded-xl shadow-xl py-6">
          <RegisterSteps />
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
