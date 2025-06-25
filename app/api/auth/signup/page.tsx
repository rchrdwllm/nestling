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
    <main className="items-center lg:items-start grid grid-cols-2 bg-primary lg:bg-none h-screen overflow-x-hidden">
      <Image
        priority
        src={registerBg}
        alt="Register Background"
        className="hidden lg:block absolute w-full h-screen object-cover"
      />
      <div className="hidden lg:block"></div>
      <div className="z-[1] flex flex-col items-center gap-4 col-span-2 lg:col-span-1 px-4 lg:px-20 pt-4 pb-12 min-h-screen">
        <Image src={logoTextReversed} className="w-52" alt="Logo Text" />
        <div className="flex flex-1 justify-center items-center bg-background shadow-xl py-6 rounded-xl w-full h-full">
          <RegisterSteps />
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
