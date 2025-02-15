import Image from "next/image";
import registerBg from "@/assets/register-bg.jpg";
import logoTextReversed from "@/assets/logo-text-reversed.png";
import { redirect } from "next/navigation";
import ResetTokenVerifier from "@/components/reset-password-verifier-page/reset-token-verifier";

type ResetPasswordVerificationPageProps = {
  searchParams: Promise<{ token: string }>;
};

const ResetPasswordVerificationPage = async ({
  searchParams,
}: ResetPasswordVerificationPageProps) => {
  const { token } = await searchParams;

  if (!token) return redirect("/");

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
          <ResetTokenVerifier token={token} />
        </div>
      </div>
    </main>
  );
};

export default ResetPasswordVerificationPage;
