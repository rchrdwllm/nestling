import { verifyResetToken } from "@/server/actions/verify-reset-token";
import NewPasswordForm from "./new-password-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ResetTokenVerifier = async ({ token }: { token: string }) => {
  const { success: verifiedToken, error } = await verifyResetToken(token);

  if (error) {
    return (
      <div className="h-full flex items-center justify-center px-20">
        <p className="text-sm text-center">
          Whoops! Token not found. Please go back to the{" "}
          <Link href="/api/auth/forgot-password" className="">
            <Button variant="link" className="inline-block px-0">
              forgot password
            </Button>
          </Link>{" "}
          page and try again.
        </p>
      </div>
    );
  }

  if (verifiedToken) {
    return <NewPasswordForm email={verifiedToken.email} />;
  }

  return <div>Verifying...</div>;
};

export default ResetTokenVerifier;
