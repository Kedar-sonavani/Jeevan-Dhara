import { NextResponse } from "next/server";
import {
  getSiteSettings,
  updateAllSettings,
  updateFundAllocation,
  updateReports,
  updateImpactStats,
} from "@/lib/settings";
import { verifyAdminAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET site settings (Fund utilisation, reports, impact stats)
export async function GET() {
  try {
    const settings = getSiteSettings();
    return NextResponse.json({ success: true, settings });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// PUT update site settings (Admin Protected)
export async function PUT(request: Request) {
  try {
    const isAdmin = await verifyAdminAuth(request);
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin authorization required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { fundAllocation, reports, impactStats } = body;

    let updated = getSiteSettings();

    if (fundAllocation && Array.isArray(fundAllocation)) {
      // Validate total sum is 100% or close
      updated = updateFundAllocation(fundAllocation);
    }

    if (reports && Array.isArray(reports)) {
      updated = updateReports(reports);
    }

    if (impactStats) {
      updated = updateImpactStats(impactStats);
    }

    return NextResponse.json({
      success: true,
      message: "Site settings updated successfully",
      settings: updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update settings" },
      { status: 500 }
    );
  }
}
