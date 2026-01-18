import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-utils";
import { TeamSchema } from "@/lib/validations";
import { uploadToCloudinary } from "@/lib/cloudinary";

/**
 * GET /api/teams/[id]
 * Fetch a single team with its roster and achievements
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const team = await prisma.team.findUnique({
      where: { id },
      include: {
        game: true,
        players: {
          select: {
            id: true,
            ign: true,
            role: true,
            image: true,
          },
        },
        achievements: {
          orderBy: { date: "desc" },
        },
        _count: {
          select: { players: true },
        },
      },
    });

    if (!team) return apiResponse.error("Team not found", 404);

    return apiResponse.success(team);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * PATCH /api/teams/[id]
 * Update a team's details
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await apiResponse.requireRole(["ADMIN", "MANAGER"]);
    const { id } = await params;
    const body = await request.json();

    // Validate request body
    const validatedData = TeamSchema.partial().parse(body);

    // If logoUrl is a base64 string, upload to Cloudinary
    if (validatedData.logoUrl?.startsWith("data:image")) {
      validatedData.logoUrl = await uploadToCloudinary(
        validatedData.logoUrl,
        "teams",
      );
    }

    const { gameId, ...updateFields } = validatedData;

    const team = await prisma.team.update({
      where: { id },
      data: {
        ...updateFields,
        ...(gameId ? { game: { connect: { id: gameId } } } : {}),
      },
    });

    return apiResponse.success(team);
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

/**
 * DELETE /api/teams/[id]
 * Delete a team
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await apiResponse.requireRole(["ADMIN"]);
    const { id } = await params;

    await prisma.team.delete({
      where: { id },
    });

    return apiResponse.success({ message: "Team deleted successfully" });
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
