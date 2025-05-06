import NextAuth, { type DefaultSession } from "next-auth";
import { Role } from ".";

export type ExtendUser = DefaultSession["user"] & {
  id: string;
  role: Role;
  image: string;
  firstName: string;
  middleName: string;
  lastName: string;
  contactNumber: string;
  notifsEnabled: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendUser;
  }

  interface User extends ExtendUser {}
}
