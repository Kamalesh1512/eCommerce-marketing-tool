import Mailgun from "mailgun.js";
import FormData from "form-data";

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY!,
  // If you have an EU domain:
  // url: "https://api.eu.mailgun.net"
});

export async function sendVerificationEmail(
  email: string,
  verificationUrl: string
) {
  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: "Your App <noreply@yourdomain.com>",
      to: [email],
      subject: "Verify your email address",
      html: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"><title>Verify your email</title></head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #2563eb;">Verify Your Email Address</h2>
              <p>Thank you for signing up! Please click the button below to verify your email address.</p>
              <div style="margin: 30px 0;">
                <a href="${verificationUrl}" 
                   style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Verify Email
                </a>
              </div>
              <p style="color: #666; font-size: 14px;">
                Or copy and paste this link into your browser:<br>
                <a href="${verificationUrl}" style="color: #2563eb;">${verificationUrl}</a>
              </p>
              <p style="color: #666; font-size: 14px; margin-top: 30px;">
                This link will expire in 24 hours. If you didn't create an account, please ignore this email.
              </p>
            </div>
          </body>
        </html>
      `,
    });
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw error;
  }
}

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: "Your App <noreply@yourdomain.com>",
      to: [email],
      subject: "Reset your password",
      html: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"><title>Reset your password</title></head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #2563eb;">Reset Your Password</h2>
              <p>We received a request to reset your password. Click the button below to create a new password.</p>
              <div style="margin: 30px 0;">
                <a href="${resetUrl}" 
                   style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Reset Password
                </a>
              </div>
              <p style="color: #666; font-size: 14px;">
                Or copy and paste this link into your browser:<br>
                <a href="${resetUrl}" style="color: #2563eb;">${resetUrl}</a>
              </p>
              <p style="color: #666; font-size: 14px; margin-top: 30px;">
                This link will expire in 30 minutes. If you didn't request a password reset, please ignore this email.
              </p>
            </div>
          </body>
        </html>
      `,
    });
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    throw error;
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: "Your App <noreply@yourdomain.com>",
      to: [email],
      subject: "Welcome to Your App!",
      html: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"><title>Welcome</title></head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #2563eb;">Welcome to Your E-Commerce Marketing Tool!</h2>
              <p>Hi ${name || "there"},</p>
              <p>Your account has been successfully verified. You're now ready to start creating amazing marketing content for your brand.</p>
              <div style="margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL}/dashboard" 
                   style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Get Started
                </a>
              </div>
              <p>If you have any questions, feel free to reach out to our support team.</p>
              <p>Happy marketing!</p>
            </div>
          </body>
        </html>
      `,
    });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
}
