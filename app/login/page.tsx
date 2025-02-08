import Image from "next/image";
import loginBg from "@/assets/login-bg.jpg";
import logoText from "@/assets/logo-text.png";
import nestling from "@/assets/nestling.png";
import LoginSteps from "@/components/login-page/login-steps";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  return (
    <main className="h-screen grid grid-cols-2 place-content-center justify-items-center overflow-x-hidden">
      <Image
        src={loginBg}
        priority
        alt="Login Background"
        className="w-full h-screen absolute object-cover"
      />
      <div></div>
      <div className="z-[1] h-screen flex flex-col items-center p-12">
        <div className="flex flex-col gap-2 items-center">
          <Image src={logoText} className="w-48" alt="Logo Text" />
          <Image src={nestling} alt="Nestling logo" className="w-[500px]" />
        </div>
        <LoginSteps />
        <Link href="/register" className="mt-4">
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
