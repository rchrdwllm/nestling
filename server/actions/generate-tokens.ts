import { db } from "@/lib/firebase";

export const generatePasswordResetToken = async (email: string) => {
  const newToken = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const tokenRef = db
    .collection("passwordResetTokens")
    .where("email", "==", email);
  const tokenSnapshot = await tokenRef.get();

  if (!tokenSnapshot.empty) {
    try {
      const token = tokenSnapshot.docs[0].data();

      await db.collection("passwordResetTokens").doc(token.token).delete();
      await db.collection("passwordResetTokens").doc(newToken).set({
        email,
        token: newToken,
        expires,
      });

      return {
        success: {
          token: newToken,
        },
      };
    } catch (error) {
      return { error };
    }
  }

  await db.collection("passwordResetTokens").doc(newToken).set({
    email,
    token: newToken,
    expires,
  });

  return {
    success: {
      token: newToken,
    },
  };
};
