import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-utils";
import { z } from "zod";

const StatusUpdateSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
});

/**
 * PATCH /api/tryouts/[id]
 * Update status of a tryout request (Admin/Manager only)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Check authorization: Admin or Manager only
    await apiResponse.requireRole(["ADMIN", "MANAGER"]);

    const { id } = await params;
    const body = await request.json();

    // Validate request body
    const { status } = StatusUpdateSchema.parse(body);

    const tryoutRequest = await prisma.tryoutRequest.update({
      where: { id },
      data: { status },
    });

    return apiResponse.success(tryoutRequest);
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
