import { verifyResetToken } from "@/server/actions/verify-reset-token";
import NewPasswordForm from "./new-password-form";

const ResetTokenVerifier = async ({ token }: { token: string }) => {
  const { success: verifiedToken, error } = await verifyResetToken(token);

  if (error) {
    return <p>{error}</p>;
  }

  if (verifiedToken) {
    return <NewPasswordForm email={verifiedToken.email} />;
  }

  return <div>Verifying...</div>;
};

export default ResetTokenVerifier;
