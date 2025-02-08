import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { db } from "./lib/firebase";
import bcrypt from "bcrypt";
import { LoginSchema } from "./schemas/LoginSchema";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const userRef = db.collection("users").where("id", "==", token.sub);
      const userDoc = await userRef.get();
      const user = userDoc.docs[0];

      if (!user.exists) return token;

      const data = user.data()!;

      token.role = data.role;
      token.firstName = data.firstName;
      token.middleName = data.middleName;
      token.lastName = data.lastName;
      token.contactNumber = data.contactNumber;
      token.email = data.email;
      token.image = data.image;

      return token;
    },
    async session({ token, session }) {
      if (session && token.sub) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.firstName = token.firstName as string;
        session.user.middleName = token.middleName as string;
        session.user.lastName = token.lastName as string;

        if (token.image) {
          session.user.image = token.image as string;
        }
      }

      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = LoginSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const usersRef = db.collection("users").where("email", "==", email);
          const users = await usersRef.get();

          if (users.empty) return null;

          const user = users.docs[0].data();

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  adapter: FirestoreAdapter(db),
});
