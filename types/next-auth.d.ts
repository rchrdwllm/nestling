import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendUser = DefaultSession["user"] & {
  id: string;
  role: string;
  image: string;
  firstName: string;
  middleName: string;
  lastName: string;
  contactNumber: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendUser;
  }

  interface User extends ExtendUser {}
}
