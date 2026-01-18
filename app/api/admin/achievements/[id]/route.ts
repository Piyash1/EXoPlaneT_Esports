import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-utils";
import { AchievementSchema } from "@/lib/validations";

/**
 * PATCH /api/admin/achievements/[id]
 * Update an achievement
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await apiResponse.requireRole(["ADMIN", "MANAGER"]);
    const { id } = await params;

    const body = await request.json();
    const validatedData = AchievementSchema.parse(body);

    const achievement = await prisma.achievement.update({
      where: { id },
      data: validatedData,
      include: {
        team: {
          select: { name: true },
        },
      },
    });

    return apiResponse.success(achievement);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * DELETE /api/admin/achievements/[id]
 * Delete an achievement
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await apiResponse.requireRole(["ADMIN", "MANAGER"]);
    const { id } = await params;

    await prisma.achievement.delete({
      where: { id },
    });

    return apiResponse.success({ message: "Achievement deleted successfully" });
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
