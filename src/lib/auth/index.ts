// src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { compare } from "bcryptjs";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { users, brandProfiles } from "@/lib/db/schema";
import { DrizzleAdapter } from "@/lib/auth/drizzle-adapter";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email))
          .limit(1);

        if (!user || !user.password) {
          throw new Error("No user found with this email");
        }

        if (!user.emailVerified) {
          throw new Error("Please verify your email before logging in");
        }

        const valid = await compare(credentials.password, user.password);
        if (!valid) throw new Error("Incorrect password");

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          plan: user.plan,
          isAdmin: user.isAdmin,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
    newUser: "/onboarding",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider !== "credentials") {
        await db
          .update(users)
          .set({ emailVerified: new Date() })
          .where(eq(users.id, user.id!));
      }
      return true;
    },
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.id = user.id;
        token.plan = user.plan;
        token.isAdmin = user.isAdmin;
        const [brandProfile] = await db
          .select()
          .from(brandProfiles)
          .where(eq(brandProfiles.user_id, user.id!))
          .limit(1);
        token.brandProfileCompleted = !!brandProfile;
      }
      // Handle session update trigger (when you call update())
      if (
        trigger === "update" &&
        session?.user?.brandProfileCompleted !== undefined
      ) {
        token.brandProfileCompleted = session.user.brandProfileCompleted;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.plan = token.plan;
        session.user.isAdmin = token.isAdmin;
        session.user.brandProfileCompleted = token.brandProfileCompleted;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
