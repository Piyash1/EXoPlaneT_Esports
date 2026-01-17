import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-utils";
import { ProfileUpdateSchema } from "@/lib/validations";
import { uploadToCloudinary } from "@/lib/cloudinary";

/**
 * GET /api/me
 * Fetch current user profile
 */
export async function GET() {
  try {
    const session = await apiResponse.getSession();
    if (!session) return apiResponse.error("Sign in required", 401);

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        playerProfile: true,
        tryouts: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return apiResponse.success(user);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * PATCH /api/me
 * Update current user profile and player details (Supports JSON and Form Data)
 */
export async function PATCH(request: NextRequest) {
  try {
    const session = await apiResponse.getSession();
    if (!session) return apiResponse.error("Sign in required", 401);

    const contentType = request.headers.get("content-type") || "";
    let name, ign, role, image;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      name = formData.get("name") as string;
      ign = formData.get("ign") as string;
      role = formData.get("role") as string;
      image = formData.get("image"); // Can be a File or string
    } else {
      const body = await request.json();
      const validatedData = ProfileUpdateSchema.parse(body);
      name = validatedData.name;
      ign = validatedData.ign;
      role = validatedData.role;
      image = validatedData.image;
    }

    let imageUrl = typeof image === "string" ? image : undefined;

    // Handle File upload if image is a File object
    if (image instanceof File) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = `data:${image.type};base64,${buffer.toString("base64")}`;
      imageUrl = await uploadToCloudinary(base64Image, "profiles");
    }
    // Handle base64 string from JSON
    else if (typeof image === "string" && image.startsWith("data:image")) {
      imageUrl = await uploadToCloudinary(image, "profiles");
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name || undefined,
        image: imageUrl || undefined,
        playerProfile: {
          upsert: {
            create: {
              ign: ign || `User_${session.user.id.substring(0, 5)}`,
              fullName: name || "Anonymous",
              role: role,
              image: imageUrl || undefined,
            },
            update: {
              ign: ign || undefined,
              role: role || undefined,
              image: imageUrl || undefined,
            },
          },
        },
      },
      include: {
        playerProfile: true,
      },
    });

    return apiResponse.success(updatedUser);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
