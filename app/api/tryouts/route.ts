import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-utils";
import { TryoutRequestSchema } from "@/lib/validations";

/**
 * GET /api/tryouts
 * Fetch all tryout requests (Admin only ideally, but keeping it open for testing)
 */
export async function GET() {
  try {
    // Check authorization: Admin or Manager only
    await apiResponse.requireRole(["ADMIN", "MANAGER"]);

    const requests = await prisma.tryoutRequest.findMany({
      orderBy: { createdAt: "desc" },
    });

    return apiResponse.success(requests);
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
 * POST /api/tryouts
 * Submit a new tryout request
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = TryoutRequestSchema.parse(body);

    const session = await apiResponse.getSession();
    const tryoutRequest = await prisma.tryoutRequest.create({
      data: {
        ...validatedData,
        userId: session?.user?.id || validatedData.userId,
      },
    });

    return apiResponse.success(tryoutRequest, 201);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
