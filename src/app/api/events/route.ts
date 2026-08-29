import { NextResponse } from "next/server";
import { getEvents, INITIAL_EVENTS, addEvent, updateEvent, deleteEvent } from "@/lib/events";
import { verifyAdminAuth } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { DonationEvent } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function mapDbToEvent(row: any): DonationEvent {
  return {
    id: row.id,
    slug: row.slug,
    titleEn: row.title_en,
    titleHi: row.title_hi || row.title_en,
    category: row.category,
    targetAmount: Number(row.target_amount),
    raisedAmount: Number(row.raised_amount || 0),
    donorCount: Number(row.donor_count || 0),
    descriptionEn: row.description_en,
    descriptionHi: row.description_hi || row.description_en,
    image: row.image || "/images/hero-charkha.jpeg",
    locationEn: row.location_en || "Bikaner, Rajasthan",
    locationHi: row.location_hi || "बीकानेर, राजस्थान",
    featured: Boolean(row.featured),
    status: row.status || "active",
    createdAt: row.created_at,
  };
}

// GET all donation events/campaigns
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");

    // Attempt to fetch from Supabase
    try {
      if (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
      ) {
        let query = supabaseAdmin.from("events").select("*").order("created_at", { ascending: false });

        if (category && category !== "all") {
          query = query.eq("category", category);
        }
        if (status && status !== "all") {
          query = query.eq("status", status);
        }

        const { data, error } = await query;

        if (!error && data && data.length > 0) {
          const events = data.map(mapDbToEvent);
          return NextResponse.json({ success: true, events });
        }

        // If table is empty on first boot, auto-seed with INITIAL_EVENTS
        if (!error && (!data || data.length === 0)) {
          const seedRows = INITIAL_EVENTS.map((e) => ({
            id: e.id,
            slug: e.slug,
            title_en: e.titleEn,
            title_hi: e.titleHi,
            category: e.category,
            target_amount: e.targetAmount,
            raised_amount: e.raisedAmount,
            donor_count: e.donorCount,
            description_en: e.descriptionEn,
            description_hi: e.descriptionHi,
            image: e.image,
            location_en: e.locationEn,
            location_hi: e.locationHi,
            featured: e.featured,
            status: e.status,
          }));
          await supabaseAdmin.from("events").upsert(seedRows);
        }
      }
    } catch (dbErr) {
      console.warn("[Supabase] Events fetch fallback to local store:", dbErr);
    }

    // Local Fallback
    let events = getEvents();
    if (category && category !== "all") {
      events = events.filter((e) => e.category === category);
    }
    if (status && status !== "all") {
      events = events.filter((e) => e.status === status);
    }

    return NextResponse.json({ success: true, events });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// POST create a new donation event (Admin Protected)
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
      titleEn,
      titleHi,
      slug,
      category,
      targetAmount,
      raisedAmount,
      donorCount,
      descriptionEn,
      descriptionHi,
      image,
      locationEn,
      locationHi,
      featured,
      status,
    } = body;

    if (!titleEn || !targetAmount || !descriptionEn) {
      return NextResponse.json(
        { success: false, error: "Missing required campaign parameters" },
        { status: 400 }
      );
    }

    const generatedSlug =
      slug ||
      titleEn
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newId = `evt-${Date.now()}`;

    // 1. Insert into Supabase if configured
    try {
      if (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
      ) {
        const { data, error } = await supabaseAdmin
          .from("events")
          .insert({
            id: newId,
            slug: generatedSlug,
            title_en: titleEn,
            title_hi: titleHi || titleEn,
            category: category || "skills",
            target_amount: Number(targetAmount),
            raised_amount: Number(raisedAmount || 0),
            donor_count: Number(donorCount || 0),
            description_en: descriptionEn,
            description_hi: descriptionHi || descriptionEn,
            image: image || "/images/hero-charkha.jpeg",
            location_en: locationEn || "Bikaner, Rajasthan",
            location_hi: locationHi || "बीकानेर, राजस्थान",
            featured: Boolean(featured),
            status: status || "active",
          })
          .select()
          .single();

        if (!error && data) {
          return NextResponse.json({ success: true, event: mapDbToEvent(data) }, { status: 201 });
        }
      }
    } catch (dbErr) {
      console.warn("[Supabase] Event insert fallback to memory:", dbErr);
    }

    const newEvent = addEvent({
      slug: generatedSlug,
      titleEn,
      titleHi: titleHi || titleEn,
      category: category || "skills",
      targetAmount: Number(targetAmount),
      descriptionEn,
      descriptionHi: descriptionHi || descriptionEn,
      image: image || "/images/hero-charkha.jpeg",
      locationEn: locationEn || "Bikaner, Rajasthan",
      locationHi: locationHi || "बीकानेर, राजस्थान",
      featured: Boolean(featured),
      status: status || "active",
    });

    return NextResponse.json({ success: true, event: newEvent }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to create event" },
      { status: 500 }
    );
  }
}

// PUT / PATCH update an existing donation event (Admin Protected)
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
        { success: false, error: "Event ID is required" },
        { status: 400 }
      );
    }

    // 1. Update in Supabase
    try {
      if (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
      ) {
        const dbUpdates: any = {};
        if (updates.titleEn) dbUpdates.title_en = updates.titleEn;
        if (updates.titleHi) dbUpdates.title_hi = updates.titleHi;
        if (updates.category) dbUpdates.category = updates.category;
        if (updates.targetAmount !== undefined) dbUpdates.target_amount = Number(updates.targetAmount);
        if (updates.raisedAmount !== undefined) dbUpdates.raised_amount = Number(updates.raisedAmount);
        if (updates.donorCount !== undefined) dbUpdates.donor_count = Number(updates.donorCount);
        if (updates.descriptionEn) dbUpdates.description_en = updates.descriptionEn;
        if (updates.descriptionHi) dbUpdates.description_hi = updates.descriptionHi;
        if (updates.image) dbUpdates.image = updates.image;
        if (updates.locationEn) dbUpdates.location_en = updates.locationEn;
        if (updates.locationHi) dbUpdates.location_hi = updates.locationHi;
        if (updates.featured !== undefined) dbUpdates.featured = Boolean(updates.featured);
        if (updates.status) dbUpdates.status = updates.status;

        const { data, error } = await supabaseAdmin
          .from("events")
          .update(dbUpdates)
          .eq("id", id)
          .select()
          .single();

        if (!error && data) {
          return NextResponse.json({ success: true, event: mapDbToEvent(data) });
        }
      }
    } catch (dbErr) {
      console.warn("[Supabase] Event update fallback:", dbErr);
    }

    const updated = updateEvent(id, updates);
    return NextResponse.json({ success: true, event: updated });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update event" },
      { status: 500 }
    );
  }
}

// DELETE an event (Admin Protected)
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
        { success: false, error: "Event ID is required" },
        { status: 400 }
      );
    }

    // 1. Delete from Supabase
    try {
      if (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
      ) {
        await supabaseAdmin.from("events").delete().eq("id", id);
      }
    } catch (dbErr) {
      console.warn("[Supabase] Event delete error:", dbErr);
    }

    const deleted = deleteEvent(id);
    return NextResponse.json({ success: deleted });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete event" },
      { status: 500 }
    );
  }
}
