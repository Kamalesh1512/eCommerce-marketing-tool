import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users, verificationTokens } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { createId } from "@paralleldrive/cuid2"
import { sendVerificationEmail } from "@/lib/services/email"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    // Check if user exists
    const user = await db.select().from(users).where(eq(users.email, email))

    if (user.length == 0) {
      // Don't reveal if user exists or not for security reasons
      return NextResponse.json(
        { message: "an account with this email does not exists, please enter correct email address"},
        { status: 401 },
      )
    }

    // Check if email is already verified
    if (user[0].emailVerified) {
      return NextResponse.json({ message: "Your email is already verified. You can log in now." }, { status: 400 })
    }

    // Delete any existing verification tokens for this email
    await db.delete(verificationTokens).where(eq(verificationTokens.identifier, email))

    // Generate a new token
    const token = createId()
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now

    // Store the token
    await db.insert(verificationTokens).values({
      identifier: email,
      token,
      expires,
    })

    // Send verification email
    await sendVerificationEmail({
      to: email,
      token,
      username: user[0].name || email,
    })

    return NextResponse.json({ message: "Verification email sent. Please check your inbox." }, { status: 200 })
  } catch (error) {
    console.error("Resend verification email error:", error)
    return NextResponse.json({ message: "An error occurred while sending the verification email" }, { status: 500 })
  }
}
