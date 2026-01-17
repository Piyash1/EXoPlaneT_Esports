import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-utils";

/**
 * DELETE /api/users/[id]
 * Delete a user (Admin only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    // 1. Check Authorization (Admin/Manager)
    await apiResponse.requireRole(["ADMIN", "MANAGER"]);

    // 2. Delete User
    // Due to cascading deletes, this will also remove:
    // - Player Profile
    // - Tryout Requests
    // - Accounts/Sessions
    await prisma.user.delete({
      where: { id },
    });

    return apiResponse.success({ message: "User deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Unauthorized")
        return apiResponse.error("Sign in required", 401);
      if (error.message === "Forbidden")
        return apiResponse.error("Access denied", 403);
    }
    return apiResponse.handleError(error);
  }
}
