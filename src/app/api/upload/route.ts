import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyAdminAuth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const isAdmin = await verifyAdminAuth(request);
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin authorization required" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const requestedBucket = (formData.get("bucket") as string) || "Images";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided in upload request" },
        { status: 400 }
      );
    }

    // Validate file extension
    const allowedExtensions = ["jpg", "jpeg", "png", "webp", "svg"];
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
    ];

    const originalExtension = (file.name.split(".").pop() || "").toLowerCase();
    if (!allowedExtensions.includes(originalExtension)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file extension .${originalExtension}. Only JPG, PNG, WEBP, and SVG are allowed.`,
        },
        { status: 400 }
      );
    }

    if (file.type && !allowedMimeTypes.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file MIME type: ${file.type}. Only image uploads are permitted.`,
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const sanitizedFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${originalExtension}`;
    const filePath = `${sanitizedFileName}`;

    // Enforce bucket target strictly to "Images" / case variations
    const targetBucketName = requestedBucket.toLowerCase() === "images" ? requestedBucket : "Images";

    // 1. Ensure the bucket exists
    try {
      const { data: buckets } = await supabaseAdmin.storage.listBuckets();
      const existing = buckets?.find((b) => b.name.toLowerCase() === "images" || b.id.toLowerCase() === "images");
      if (!existing) {
        await supabaseAdmin.storage.createBucket("Images", { public: true });
      }
    } catch (bErr) {
      console.warn("Bucket check fallback:", bErr);
    }

    // 2. Upload to the verified Supabase Storage Bucket
    const { data, error } = await supabaseAdmin.storage
      .from(targetBucketName)
      .upload(filePath, buffer, {
        contentType: file.type || `image/${originalExtension === "jpg" ? "jpeg" : originalExtension}`,
        upsert: true,
      });

    if (error) {
      console.error(`Supabase upload error for bucket "${targetBucketName}":`, error);
      return NextResponse.json(
        { success: false, error: `${error.message} (Tried bucket: ${targetBucketName})` },
        { status: 500 }
      );
    }

    // 3. Retrieve public URL
    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from(targetBucketName).getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: file.name,
      bucket: targetBucketName,
    });
  } catch (err: any) {
    console.error("File upload handler error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}
