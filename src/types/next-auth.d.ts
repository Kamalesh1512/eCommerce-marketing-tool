import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      plan:
        | "free"
        | "starter_monthly"
        | "starter_yearly"
        | "growth_monthly"
        | "growth_yearly"
        | "enterprise";
      isAdmin: boolean;
      hasCompletedOnboarding: boolean; // ✅ add this
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    plan:
      | "free"
      | "starter_monthly"
      | "starter_yearly"
      | "growth_monthly"
      | "growth_yearly"
      | "enterprise";
    isAdmin: boolean;
    hasCompletedOnboarding: boolean; // ✅ optional but recommended
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    plan:
      | "free"
      | "starter_monthly"
      | "starter_yearly"
      | "growth_monthly"
      | "growth_yearly"
      | "enterprise";
    isAdmin: boolean;
    hasCompletedOnboarding: boolean; // ✅ add this
  }
}
