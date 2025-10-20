//api/auth/verify-email/[token]
import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { users, verificationTokens } from "@/lib/db/schema"

interface VerifyProps {
  params: Promise<{
    token: string
  }>
}

export async function GET(request: Request, { params }: VerifyProps) {
  try {
    const { token } = await params
    console.log("=== Email Verification Started ===")
    console.log("Token received:", token)

    if (!token) {
      console.log("❌ No token provided")
      return NextResponse.redirect(new URL("/login?error=InvalidToken", request.url))
    }

    // Extract email from URL
    const url = new URL(request.url)
    const email = url.searchParams.get("email")
    console.log("Email from URL:", email)

    // Find the token
    console.log("Querying database for token...")
    const verificationToken = await db
      .select()
      .from(verificationTokens)
      .where(eq(verificationTokens.token, token))
      .limit(1)

    console.log("Query result:", verificationToken)
    console.log("Token found:", verificationToken.length > 0)

    if (!verificationToken || verificationToken.length === 0) {
      console.log("❌ Token not found in database")
      return NextResponse.redirect(new URL("/login?error=InvalidToken", request.url))
    }

    const tokenData = verificationToken[0]
    console.log("Token data:", {
      identifier: tokenData.identifier,
      expires: tokenData.expires,
      expiresType: typeof tokenData.expires
    })

    // Convert expires to Date if it's a string
    const expiresDate = tokenData.expires instanceof Date 
      ? tokenData.expires 
      : new Date(tokenData.expires)

    console.log("Expires date:", expiresDate)
    console.log("Current date:", new Date())
    console.log("Is expired:", new Date() > expiresDate)

    // Check if token is expired
    if (new Date() > expiresDate) {
      console.log("❌ Token is expired")
      // Delete expired token
      await db
        .delete(verificationTokens)
        .where(eq(verificationTokens.token, token))

      return NextResponse.redirect(new URL("/login?error=ExpiredToken", request.url))
    }

    // Create a proper Date object for the update
    const now = new Date()
    console.log("Updating user email verification status...")
    console.log("Date to set:", now, "Type:", typeof now)
    
    const updateResult = await db
      .update(users)
      .set({ 
        emailVerified: now,
        updatedAt: now
      })
      .where(eq(users.email, tokenData.identifier))
      .returning()

    console.log("Update result:", updateResult)

    if (updateResult.length === 0) {
      console.log("❌ No user found with email:", tokenData.identifier)
      return NextResponse.redirect(new URL("/login?error=UserNotFound", request.url))
    }

    // Delete the token
    console.log("Deleting verification token...")
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.token, token))

    console.log("✅ Email verification successful!")
    return NextResponse.redirect(new URL("/login?verified=true", request.url))
  } catch (error) {
    console.error("❌ Email verification error:", error)
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace")
    return NextResponse.redirect(new URL("/login?error=VerificationFailed", request.url))
  }
}