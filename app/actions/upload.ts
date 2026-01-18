"use server";

import { uploadToCloudinary } from "@/lib/cloudinary";

export async function uploadAvatarAction(base64Image: string) {
  try {
    const imageUrl = await uploadToCloudinary(base64Image, "profiles");
    return { success: true, url: imageUrl };
  } catch (error) {
    console.error("Upload Action Error:", error);
    return { success: false, error: "Upload failed" };
  }
}

export async function uploadImageAction(
  base64Image: string,
  folder: string = "general",
) {
  try {
    const imageUrl = await uploadToCloudinary(base64Image, folder);
    return { success: true, url: imageUrl };
  } catch (error) {
    console.error("Upload Action Error:", error);
    return { success: false, error: "Upload failed" };
  }
}
