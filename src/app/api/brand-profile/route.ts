import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { brandProfiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

// GET - Fetch user's brand profile
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const [brandProfile] = await db
      .select()
      .from(brandProfiles)
      .where(eq(brandProfiles.user_id, session.user.id))
      .limit(1);

    if (!brandProfile) {
      return NextResponse.json(
        { error: "Brand profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(brandProfile, { status: 200 });
  } catch (error) {
    console.error("Get brand profile error:", error);
    return NextResponse.json(
      { error: "Failed to fetch brand profile" },
      { status: 500 }
    );
  }
}

// POST - Create brand profile
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await req.json();

    // Validate required fields
    if (!data.companyName) {
      return NextResponse.json(
        { error: "Company name is required" },
        { status: 400 }
      );
    }

    // Check if profile already exists
    const [existingProfile] = await db
      .select()
      .from(brandProfiles)
      .where(eq(brandProfiles.user_id, session.user.id))
      .limit(1);

    if (existingProfile) {
      return NextResponse.json(
        { error: "Brand profile already exists" },
        { status: 409 }
      );
    }

    // Create brand profile
    const [newProfile] = await db
      .insert(brandProfiles)
      .values({
        user_id: session.user.id,
        company_name: data.companyName,
        revenue_bracket: data.revenueBracket || null,
        platform: data.platform || null,
        currency: data.currency || "USD",
        brand_tone_sample: data.brandToneSample || null,
        primary_audience: data.primaryAudience || null,
        skus_count: data.skusCount || 0,
      })
      .returning();
      

    return NextResponse.json(
      { message: "Brand profile created successfully", profile: newProfile },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create brand profile error:", error);
    return NextResponse.json(
      { error: "Failed to create brand profile" },
      { status: 500 }
    );
  }
}

// PUT - Update brand profile
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await req.json();

    const [updatedProfile] = await db
      .update(brandProfiles)
      .set({
        company_name: data.companyName,
        revenue_bracket: data.revenueBracket,
        platform: data.platform,
        currency: data.currency,
        brand_tone_sample: data.brandToneSample,
        primary_audience: data.primaryAudience,
        skus_count: data.skusCount,
      })
      .where(eq(brandProfiles.user_id, session.user.id))
      .returning();

    if (!updatedProfile) {
      return NextResponse.json(
        { error: "Brand profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Brand profile updated successfully", profile: updatedProfile },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update brand profile error:", error);
    return NextResponse.json(
      { error: "Failed to update brand profile" },
      { status: 500 }
    );
  }
}