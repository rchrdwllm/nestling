import { Resend } from "resend";
import getBaseUrl from "@/lib/base-url";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetToken = async (email: string, token: string) => {
  const { data, error } = await resend.emails.send({
    from: "Nestling <onboarding@resend.dev>",
    to: [email],
    subject: "Nestling - Password Reset",
    html: `<h1>Reset your password</h1>
      <p>Click <a href="${getBaseUrl()}/api/auth/reset-password-verification?token=${token}">here</a> to reset your password.</p>`,
  });

  return {
    success: data,
    error,
  };
};
