//src/types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      plan: "free" | "starter_monthly" | "starter_yearly" | "growth_monthly" | "growth_yearly" | "enterprise";
      isAdmin: boolean;
      brandProfileCompleted: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    plan: "free" | "starter_monthly" | "starter_yearly" | "growth_monthly" | "growth_yearly" | "enterprise";
    isAdmin: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    plan: "free" | "starter_monthly" | "starter_yearly" | "growth_monthly" | "growth_yearly" | "enterprise";
    isAdmin: boolean;
    brandProfileCompleted: boolean;
  }
}