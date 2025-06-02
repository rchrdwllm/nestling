import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/firebase";
import { LoginSchema } from "@/schemas/LoginSchema";
import bcrypt from "bcrypt";
import { Role, User, MonthlyActivity } from "@/types";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

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

      const userRef = db.collection("users").doc(token.sub);
      const userDoc = await userRef.get();

      if (!userDoc.exists) return token;

      const user = userDoc.data() as User;

      if (user.role !== "admin") {
        const today = new Date();
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const dateString = today.toISOString();
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const activityRef = await db
          .collection("monthlyActivities")
          .where("userId", "==", user.id)
          .where("type", "==", "login")
          .where(
            "createdAt",
            ">=",
            formatInTimeZone(monthStart, timeZone, "yyyy-MM-dd")
          )
          .where(
            "createdAt",
            "<=",
            formatInTimeZone(monthEnd, timeZone, "yyyy-MM-dd")
          )
          .get();

        if (activityRef.empty) {
          const id = crypto.randomUUID();
          const formattedDate = formatInTimeZone(
            dateString,
            timeZone,
            "yyyy-MM-dd"
          );
          await db.collection("monthlyActivities").doc(id).set({
            id,
            userId: user.id,
            type: "login",
            createdAt: formattedDate,
            updatedAt: new Date().toISOString(),
          });
        } else {
          const activityData = activityRef.docs[0].data() as MonthlyActivity;
          await db.collection("monthlyActivities").doc(activityData.id).update({
            updatedAt: new Date().toISOString(),
          });
        }
      }

      token.role = user.role;
      token.firstName = user.firstName;
      token.middleName = user.middleName;
      token.name = `${user.firstName} ${user.middleName} ${user.lastName}`;
      token.lastName = user.lastName;
      token.contactNumber = user.contactNumber;
      token.email = user.email;
      token.image = user.image;
      token.notifsEnabled = user.notifsEnabled;

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
        session.user.contactNumber = user.contactNumber as string;
        session.user.notifsEnabled = user.notifsEnabled as boolean;

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
