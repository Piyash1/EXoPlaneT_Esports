import { z } from "zod";

export const GameSchema = z.object({
  name: z.string().min(2, "Game name must be at least 2 characters"),
  type: z.enum(["Mobile", "PC"]),
});

export const TeamSchema = z.object({
  name: z.string().min(2, "Team name must be at least 2 characters"),
  gameId: z.string().cuid("Invalid Game ID"),
  logoUrl: z.string().url("Invalid logo URL").optional().or(z.literal("")),
});

export const PlayerSchema = z.object({
  ign: z.string().min(2, "IGN must be at least 2 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  role: z.string().optional(),
  teamId: z.string().cuid("Invalid Team ID").optional(),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
});

export const TryoutRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  ign: z.string().min(2, "IGN must be at least 2 characters"),
  game: z.string().min(2, "Game name must be at least 2 characters"),
  role: z.string().min(2, "In-game role must be at least 2 characters"),
  discord: z.string().min(2, "Discord ID must be at least 2 characters"),
  userId: z.string().optional(),
});

export const AchievementSchema = z.object({
  title: z.string().min(2, "Achievement title must be at least 2 characters"),
  description: z.string().optional(),
  date: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  teamId: z.string().cuid("Invalid Team ID"),
});

export const ProfileUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  ign: z.string().min(2).optional(),
  role: z.string().optional(),
  image: z.string().optional(), // This will be the base64 string or URL
});
