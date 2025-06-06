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
  address: string;
  notifsEnabled: boolean;
  lastLoginAt?: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendUser;
  }

  interface User extends ExtendUser {}
}
