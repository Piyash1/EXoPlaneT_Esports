import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await transporter.sendMail({
        from: '"Exoplanet Esports" <no-reply@exoplanet.gg>',
        to: user.email,
        subject: "Verify Your Neural Profile - Exoplanet",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #000; color: #fff; border: 1px solid #a855f7; border-radius: 12px;">
            <h1 style="color: #a855f7; text-align: center;">WELCOME PILOT</h1>
            <p style="font-size: 16px; line-height: 1.6;">Your neural profile is almost ready. Click the button below to verify your email and gain full access to the Exoplanet Terminal.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${url}" style="background-color: #06b6d4; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; text-transform: uppercase;">Verify Access</a>
            </div>
            <p style="font-size: 12px; color: #666; text-align: center;">If you didn't request this, ignore this transmission.</p>
          </div>
        `,
      });
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
        input: false,
      },
    },
  },
});
