import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-utils";
import { TeamSchema } from "@/lib/validations";
import { uploadToCloudinary } from "@/lib/cloudinary";

/**
 * GET /api/teams
 * Fetch all teams, optionally filtered by gameId
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get("gameId");

    const teams = await prisma.team.findMany({
      where: gameId ? { gameId } : {},
      include: {
        game: {
          select: { name: true },
        },
        players: {
          select: {
            id: true,
            ign: true,
            role: true,
            image: true,
          },
        },
        _count: {
          select: { players: true },
        },
      },
      orderBy: { name: "asc" },
    });

    return apiResponse.success(teams);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * POST /api/teams
 * Create a new team
 */
export async function POST(request: NextRequest) {
  try {
    // Check authorization: Admin or Manager only
    await apiResponse.requireRole(["ADMIN", "MANAGER"]);

    const body = await request.json();

    // Validate request body
    const validatedData = TeamSchema.parse(body);

    // If logoUrl is a base64 string, upload to Cloudinary
    if (validatedData.logoUrl?.startsWith("data:image")) {
      validatedData.logoUrl = await uploadToCloudinary(
        validatedData.logoUrl,
        "teams",
      );
    }

    const team = await prisma.team.create({
      data: {
        name: validatedData.name,
        logoUrl: validatedData.logoUrl,
        wins: validatedData.wins,
        rank: validatedData.rank,
        readiness: validatedData.readiness,
        game: {
          connect: { id: validatedData.gameId },
        },
      },
    });

    return apiResponse.success(team, 201);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Unauthorized")
        return apiResponse.error("Sign in required", 401);
      if (error.message === "Forbidden")
        return apiResponse.error("Admin or Manager access required", 403);
    }
    return apiResponse.handleError(error);
  }
}
