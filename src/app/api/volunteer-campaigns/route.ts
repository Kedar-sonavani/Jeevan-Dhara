import { NextResponse } from "next/server";
import { getVolunteerCampaigns } from "@/lib/volunteer-campaigns";

export async function GET() {
  try {
    const campaigns = getVolunteerCampaigns();
    return NextResponse.json({ success: true, campaigns }, { status: 200 });
  } catch (error) {
    console.error("Error fetching volunteer campaigns:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
