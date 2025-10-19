//api/auth/[...nextauth]
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// ✅ Create a NextAuth handler instance using your config
const handler = NextAuth(authOptions);

// ✅ Re-export both GET and POST handlers — required for App Router
export { handler as GET, handler as POST };
