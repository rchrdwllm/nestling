import Image from "next/image";
import loginBg from "@/assets/login-bg.jpg";
import logoText from "@/assets/logo-text.png";
import nestling from "@/assets/nestling.png";
import LoginSteps from "@/components/shared/login-page/login-steps";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  return (
    <main className="bg-primary p-4 lg:p-0 lg:bg-none h-screen grid grid-cols-2 place-content-center justify-items-center overflow-x-hidden">
      <Image
        src={loginBg}
        priority
        alt="Login Background"
        className="hidden lg:block w-full h-screen absolute object-cover"
      />
      <div className="hidden lg:block"></div>
      <div className="bg-card rounded-xl shadow-sm lg:bg-transparent lg:shadow-none col-span-2 lg:col-span-1 z-[1] h-[90vh] lg:h-screen flex flex-col items-center p-12">
        <div className="flex flex-col gap-2 items-center">
          <Image src={logoText} className="w-48" alt="Logo Text" />
          <div>
            <Image
              src={nestling}
              alt="Nestling logo"
              className="h-[50px] lg:h-[100px] object-contain"
            />
          </div>
        </div>
        <LoginSteps />
        <Link href="/api/auth/signup" className="mt-4">
          <Button
            variant="link"
            className="text-muted-foreground hover:text-primary"
          >
            Create an account
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default LoginPage;
