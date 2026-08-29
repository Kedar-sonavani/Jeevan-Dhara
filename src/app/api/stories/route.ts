import { NextResponse } from "next/server";
import { getStories, INITIAL_STORIES, getStoriesByEventSlug, addStory, updateStory, deleteStory } from "@/lib/stories";
import { verifyAdminAuth } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { ImpactStory } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function mapDbToStory(row: any): ImpactStory {
  return {
    id: row.id,
    beneficiaryName: row.beneficiary_name,
    villageEn: row.village_en || "Rajasthan",
    villageHi: row.village_hi || "राजस्थान",
    category: row.category || "skills",
    headlineEn: row.headline_en || "",
    headlineHi: row.headline_hi || "",
    storyEn: row.story_en,
    storyHi: row.story_hi || row.story_en,
    quoteEn: row.quote_en || "",
    quoteHi: row.quote_hi || row.quote_en || "",
    donationImpactEn: row.donation_impact_en || "",
    donationImpactHi: row.donation_impact_hi || "",
    eventSlug: row.event_slug || "general",
    image: row.image || "/images/hero-charkha.jpeg",
    year: row.year || "2025",
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const eventSlug = searchParams.get("eventSlug");

    // Fetch from Supabase
    try {
      if (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
      ) {
        let query = supabaseAdmin.from("stories").select("*").order("created_at", { ascending: false });

        if (eventSlug) {
          query = query.eq("event_slug", eventSlug);
        }

        const { data, error } = await query;

        if (!error && data && data.length > 0) {
          const stories = data.map(mapDbToStory);
          return NextResponse.json({ success: true, stories });
        }

        // Auto-seed if empty
        if (!error && (!data || data.length === 0)) {
          const seedStories = INITIAL_STORIES.map((s) => ({
            id: s.id,
            beneficiary_name: s.beneficiaryName,
            village_en: s.villageEn,
            village_hi: s.villageHi,
            category: s.category,
            headline_en: s.headlineEn,
            headline_hi: s.headlineHi,
            story_en: s.storyEn,
            story_hi: s.storyHi,
            quote_en: s.quoteEn,
            quote_hi: s.quoteHi,
            donation_impact_en: s.donationImpactEn,
            donation_impact_hi: s.donationImpactHi,
            event_slug: s.eventSlug,
            image: s.image,
            year: s.year,
          }));
          await supabaseAdmin.from("stories").upsert(seedStories);
        }
      }
    } catch (dbErr) {
      console.warn("[Supabase] Stories fetch fallback:", dbErr);
    }

    let stories = getStories();
    if (eventSlug) {
      stories = getStoriesByEventSlug(eventSlug);
    }

    return NextResponse.json({ success: true, stories });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch stories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const isAdmin = await verifyAdminAuth(request);
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin authorization required" },
        { status: 401 }
      );
    }
    const body = await request.json();
    const {
      beneficiaryName,
      villageEn,
      villageHi,
      category,
      headlineEn,
      headlineHi,
      storyEn,
      storyHi,
      quoteEn,
      quoteHi,
      donationImpactEn,
      donationImpactHi,
      eventSlug,
      image,
      year,
    } = body;

    if (!beneficiaryName || !storyEn || !eventSlug) {
      return NextResponse.json(
        { success: false, error: "Missing required story fields" },
        { status: 400 }
      );
    }

    const newId = `story-${Date.now()}`;

    // Insert to Supabase
    try {
      if (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
      ) {
        const { data, error } = await supabaseAdmin
          .from("stories")
          .insert({
            id: newId,
            beneficiary_name: beneficiaryName,
            village_en: villageEn || "Rajasthan Village",
            village_hi: villageHi || "राजस्थान",
            category: category || "skills",
            headline_en: headlineEn || `${beneficiaryName}'s Transformation`,
            headline_hi: headlineHi || `${beneficiaryName} की कहानी`,
            story_en: storyEn,
            story_hi: storyHi || storyEn,
            quote_en: quoteEn || "",
            quote_hi: quoteHi || quoteEn || "",
            donation_impact_en: donationImpactEn || "Supported by generous donors",
            donation_impact_hi: donationImpactHi || "दानदाताओं के सहयोग से संपन्न",
            event_slug: eventSlug,
            image: image || "/images/hero-charkha.jpeg",
            year: year || new Date().getFullYear().toString(),
          })
          .select()
          .single();

        if (!error && data) {
          return NextResponse.json({ success: true, story: mapDbToStory(data) }, { status: 201 });
        }
      }
    } catch (dbErr) {
      console.warn("[Supabase] Story insert fallback:", dbErr);
    }

    const createdStory = addStory({
      beneficiaryName,
      villageEn: villageEn || "Rajasthan Village",
      villageHi: villageHi || "राजस्थान",
      category: category || "skills",
      headlineEn: headlineEn || `${beneficiaryName}'s Transformation`,
      headlineHi: headlineHi || `${beneficiaryName} की कहानी`,
      storyEn,
      storyHi: storyHi || storyEn,
      quoteEn: quoteEn || "",
      quoteHi: quoteHi || quoteEn || "",
      donationImpactEn: donationImpactEn || "Supported by generous individual donors",
      donationImpactHi: donationImpactHi || "दानदाताओं के सहयोग से संपन्न",
      eventSlug,
      image: image || "/images/hero-charkha.jpeg",
      year: year || new Date().getFullYear().toString(),
    });

    return NextResponse.json({ success: true, story: createdStory }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to create story" },
      { status: 500 }
    );
  }
}

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
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Story ID is required" },
        { status: 400 }
      );
    }

    // Update in Supabase
    try {
      if (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
      ) {
        const dbUpdates: any = {};
        if (updates.beneficiaryName) dbUpdates.beneficiary_name = updates.beneficiaryName;
        if (updates.villageEn) dbUpdates.village_en = updates.villageEn;
        if (updates.villageHi) dbUpdates.village_hi = updates.villageHi;
        if (updates.category) dbUpdates.category = updates.category;
        if (updates.headlineEn) dbUpdates.headline_en = updates.headlineEn;
        if (updates.headlineHi) dbUpdates.headline_hi = updates.headlineHi;
        if (updates.storyEn) dbUpdates.story_en = updates.storyEn;
        if (updates.storyHi) dbUpdates.story_hi = updates.storyHi;
        if (updates.quoteEn !== undefined) dbUpdates.quote_en = updates.quoteEn;
        if (updates.quoteHi !== undefined) dbUpdates.quote_hi = updates.quoteHi;
        if (updates.donationImpactEn !== undefined) dbUpdates.donation_impact_en = updates.donationImpactEn;
        if (updates.donationImpactHi !== undefined) dbUpdates.donation_impact_hi = updates.donationImpactHi;
        if (updates.eventSlug) dbUpdates.event_slug = updates.eventSlug;
        if (updates.image) dbUpdates.image = updates.image;
        if (updates.year) dbUpdates.year = updates.year;

        const { data, error } = await supabaseAdmin
          .from("stories")
          .update(dbUpdates)
          .eq("id", id)
          .select()
          .single();

        if (!error && data) {
          return NextResponse.json({ success: true, story: mapDbToStory(data) });
        }
      }
    } catch (dbErr) {
      console.warn("[Supabase] Story update fallback:", dbErr);
    }

    const updated = updateStory(id, updates);
    return NextResponse.json({ success: true, story: updated });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update story" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const isAdmin = await verifyAdminAuth(request);
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin authorization required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Story ID is required" },
        { status: 400 }
      );
    }

    // Delete in Supabase
    try {
      if (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
      ) {
        await supabaseAdmin.from("stories").delete().eq("id", id);
      }
    } catch (dbErr) {
      console.warn("[Supabase] Story delete error:", dbErr);
    }

    const deleted = deleteStory(id);
    return NextResponse.json({ success: deleted });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete story" },
      { status: 500 }
    );
  }
}
