// import { and, eq } from "drizzle-orm";
// import type {
//   Adapter,
//   AdapterAccount,
//   AdapterSession,
//   AdapterUser,
// } from "next-auth/adapters";
// import { db } from "@/lib/db";
// import { accounts, sessions, users, verificationTokens } from "@/lib/db/schema";

// export interface CustomAdapterUser extends AdapterUser {
//   plan:  "free" | "starter_monthly" | "starter_yearly" | "growth_monthly" | "growth_yearly" | "enterprise";
//   isAdmin: boolean;
// }

// export function DrizzleAdapter(): Adapter {
//   return {
//     async createUser(userData:any) {
//       const [newUser] = await db
//         .insert(users)
//         .values({
//           name: userData.name,
//           email: userData.email,
//           emailVerified: userData.emailVerified,
//           image: userData.image,
//         })
//         .returning();

//       return newUser as CustomAdapterUser;
//     },

//     async getUser(id) {
//       const [user] = await db
//         .select()
//         .from(users)
//         .where(eq(users.id, id))
//         .limit(1);

//       return user ? (user as CustomAdapterUser) : null;
//     },

//     async getUserByEmail(email) {
//       const [user] = await db
//         .select()
//         .from(users)
//         .where(eq(users.email, email))
//         .limit(1);

//       return user ? (user as CustomAdapterUser) : null;
//     },

//     async getUserByAccount({ provider, providerAccountId }) {
//       const result = await db
//         .select({
//           user: users,
//         })
//         .from(accounts)
//         .where(
//           and(
//             eq(accounts.provider, provider),
//             eq(accounts.providerAccountId, providerAccountId)
//           )
//         )
//         .innerJoin(users, eq(accounts.userId, users.id))
//         .limit(1);

//       return result.length ? (result[0].user as CustomAdapterUser) : null;
//     },

//     async updateUser(user) {
//       const [updatedUser] = await db
//         .update(users)
//         .set({
//           name: user.name,
//           email: user.email,
//           emailVerified: user.emailVerified,
//           image: user.image,
//         })
//         .where(eq(users.id, user.id!))
//         .returning();

//       return updatedUser as CustomAdapterUser;
//     },

//     async deleteUser(userId) {
//       await db.delete(users).where(eq(users.id, userId));
//     },

//     async linkAccount(accountData:any) {
//       await db.insert(accounts).values({
//         userId: accountData.userId,
//         type: accountData.type,
//         provider: accountData.provider,
//         providerAccountId: accountData.providerAccountId,
//         refresh_token: accountData.refresh_token,
//         access_token: accountData.access_token,
//         expires_at: accountData.expires_at,
//         token_type: accountData.token_type,
//         scope: accountData.scope,
//         id_token: accountData.id_token,
//         session_state: accountData.session_state,
//       });
//     },

//     async unlinkAccount({ provider, providerAccountId }:any) {
//       await db
//         .delete(accounts)
//         .where(
//           and(
//             eq(accounts.provider, provider),
//             eq(accounts.providerAccountId, providerAccountId)
//           )
//         );
//     },

//     async createSession(sessionData) {
//       const [session] = await db
//         .insert(sessions)
//         .values({
//           userId: sessionData.userId,
//           sessionToken: sessionData.sessionToken,
//           expires: sessionData.expires,
//         })
//         .returning();

//       return session as AdapterSession;
//     },

//     async getSessionAndUser(sessionToken) {
//       const result = await db
//         .select({
//           session: sessions,
//           user: users,
//         })
//         .from(sessions)
//         .where(eq(sessions.sessionToken, sessionToken))
//         .innerJoin(users, eq(sessions.userId, users.id))
//         .limit(1);

//       if (!result.length) return null;

//       return {
//         session: result[0].session as AdapterSession,
//         user: result[0].user as CustomAdapterUser,
//       };
//     },

//     async updateSession(session) {
//       const [updatedSession] = await db
//         .update(sessions)
//         .set({
//           expires: session.expires,
//         })
//         .where(eq(sessions.sessionToken, session.sessionToken))
//         .returning();

//       return updatedSession as AdapterSession;
//     },

//     async deleteSession(sessionToken) {
//       await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken));
//     },

//     async createVerificationToken(verificationToken) {
//       const [token] = await db
//         .insert(verificationTokens)
//         .values({
//           identifier: verificationToken.identifier,
//           token: verificationToken.token,
//           expires: verificationToken.expires,
//         })
//         .returning();

//       return token;
//     },

//     async useVerificationToken({ identifier, token }) {
//       const [verificationToken] = await db
//         .select()
//         .from(verificationTokens)
//         .where(
//           and(
//             eq(verificationTokens.identifier, identifier),
//             eq(verificationTokens.token, token)
//           )
//         )
//         .limit(1);

//       if (!verificationToken) return null;

//       await db
//         .delete(verificationTokens)
//         .where(
//           and(
//             eq(verificationTokens.identifier, identifier),
//             eq(verificationTokens.token, token)
//           )
//         );

//       return verificationToken;
//     },
//   };
// }

import { and, eq } from "drizzle-orm";
import type {
  Adapter,
  AdapterAccount,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from "next-auth/adapters";
import { db } from "@/lib/db";
import { accounts, sessions, users, verificationTokens } from "@/lib/db/schema";

// Extend AdapterUser to include your custom fields
export interface CustomAdapterUser extends AdapterUser {
  plan:
    | "free"
    | "starter_monthly"
    | "starter_yearly"
    | "growth_monthly"
    | "growth_yearly"
    | "enterprise";
  isAdmin: boolean;
}

/**
 * ✅ Correct Export:
 * NextAuth expects a function that RETURNS an Adapter object.
 * NOT an object directly — that’s what was causing the “apply” error.
 */
export function DrizzleAdapter(): Adapter {
  return {
    async createUser(userData:any) {
      const [newUser] = await db
        .insert(users)
        .values({
          name: userData.name,
          email: userData.email,
          emailVerified: userData.emailVerified,
          image: userData.image,
          // ⚡ Optional defaults
          plan: "free",
          isAdmin: false,
        })
        .returning();

      return newUser as CustomAdapterUser;
    },

    async getUser(id) {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);
      return user ? (user as CustomAdapterUser) : null;
    },

    async getUserByEmail(email) {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
      return user ? (user as CustomAdapterUser) : null;
    },

    async getUserByAccount({ provider, providerAccountId }) {
      const result = await db
        .select({
          user: users,
        })
        .from(accounts)
        .where(
          and(
            eq(accounts.provider, provider),
            eq(accounts.providerAccountId, providerAccountId)
          )
        )
        .innerJoin(users, eq(accounts.userId, users.id))
        .limit(1);

      return result.length ? (result[0].user as CustomAdapterUser) : null;
    },

    async updateUser(user) {
      const [updatedUser] = await db
        .update(users)
        .set({
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          image: user.image,
        })
        .where(eq(users.id, user.id!))
        .returning();

      return updatedUser as CustomAdapterUser;
    },

    async deleteUser(userId) {
      await db.delete(users).where(eq(users.id, userId));
    },

    async linkAccount(accountData: AdapterAccount) {
      await db.insert(accounts).values({
        userId: accountData.userId,
        type: accountData.type,
        provider: accountData.provider,
        providerAccountId: accountData.providerAccountId,
        refresh_token: accountData.refresh_token,
        access_token: accountData.access_token,
        expires_at: accountData.expires_at,
        token_type: accountData.token_type,
        scope: accountData.scope,
        id_token: accountData.id_token,
        session_state: accountData.session_state,
      });
      return accountData;
    },

    async unlinkAccount({ provider, providerAccountId }:any) {
      await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.provider, provider),
            eq(accounts.providerAccountId, providerAccountId)
          )
        );
    },

    async createSession(sessionData) {
      const [session] = await db
        .insert(sessions)
        .values({
          userId: sessionData.userId,
          sessionToken: sessionData.sessionToken,
          expires: sessionData.expires,
        })
        .returning();

      return session as AdapterSession;
    },

    async getSessionAndUser(sessionToken) {
      const result = await db
        .select({
          session: sessions,
          user: users,
        })
        .from(sessions)
        .where(eq(sessions.sessionToken, sessionToken))
        .innerJoin(users, eq(sessions.userId, users.id))
        .limit(1);

      if (!result.length) return null;

      return {
        session: result[0].session as AdapterSession,
        user: result[0].user as CustomAdapterUser,
      };
    },

    async updateSession(session) {
      const [updatedSession] = await db
        .update(sessions)
        .set({
          expires: session.expires,
        })
        .where(eq(sessions.sessionToken, session.sessionToken))
        .returning();

      return updatedSession as AdapterSession;
    },

    async deleteSession(sessionToken) {
      await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken));
    },

    async createVerificationToken(verificationToken: VerificationToken) {
      const [token] = await db
        .insert(verificationTokens)
        .values({
          identifier: verificationToken.identifier,
          token: verificationToken.token,
          expires: verificationToken.expires,
        })
        .returning();

      return token;
    },

    async useVerificationToken({ identifier, token }) {
      const [verificationToken] = await db
        .select()
        .from(verificationTokens)
        .where(
          and(
            eq(verificationTokens.identifier, identifier),
            eq(verificationTokens.token, token)
          )
        )
        .limit(1);

      if (!verificationToken) return null;

      await db
        .delete(verificationTokens)
        .where(
          and(
            eq(verificationTokens.identifier, identifier),
            eq(verificationTokens.token, token)
          )
        );

      return verificationToken;
    },
  };
}
