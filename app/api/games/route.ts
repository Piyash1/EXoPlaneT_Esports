import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-utils";
import { GameSchema } from "@/lib/validations";

/**
 * GET /api/games
 * Fetch all available games
 */
export async function GET() {
  try {
    const games = await prisma.game.findMany({
      include: {
        _count: {
          select: { teams: true },
        },
      },
      orderBy: { name: "asc" },
    });

    return apiResponse.success(games);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * POST /api/games
 * Create a new game entry
 */
export async function POST(request: NextRequest) {
  try {
    // Check authorization: Admin only
    await apiResponse.requireRole(["ADMIN"]);

    const body = await request.json();

    // Validate request body
    const validatedData = GameSchema.parse(body);

    const game = await prisma.game.create({
      data: validatedData,
    });

    return apiResponse.success(game, 201);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Unauthorized")
        return apiResponse.error("Sign in required", 401);
      if (error.message === "Forbidden")
        return apiResponse.error("Admin access required", 403);
    }
    return apiResponse.handleError(error);
  }
}
