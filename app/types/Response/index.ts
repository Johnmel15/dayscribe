import { User } from "@/prisma/generated/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string | undefined | null;
  updatedAt: string | undefined | null;
  emailVerified: string | undefined | null;
};
