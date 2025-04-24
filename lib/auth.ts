import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/firebase";
import { LoginSchema } from "@/schemas/LoginSchema";
import bcrypt from "bcrypt";
import { Role, User } from "@/types";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        const parsedCredentials = LoginSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const usersRef = db.collection("users").where("email", "==", email);
          const users = await usersRef.get();

          if (users.empty) {
            console.log("User not found in Firestore");
            return null;
          }

          const user = users.docs[0].data() as User;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return user;
          } else {
            return null;
          }
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

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
      const userRef = db.collection("users").where("id", "==", token.sub);
      const userDoc = await userRef.get();
      const user = userDoc.docs[0].data() as User;

      if (token.sub) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = `${user.firstName} ${user.lastName}`;
        session.user.email = user.email as string;
        session.user.role = user.role as Role;
        session.user.firstName = user.firstName as string;
        session.user.middleName = user.middleName as string;
        session.user.lastName = user.lastName as string;

        if (token.image) {
          session.user.image = token.image as string;
        }
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
} satisfies NextAuthOptions;
