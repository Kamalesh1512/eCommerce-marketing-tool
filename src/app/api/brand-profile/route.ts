// app/api/brand-profile/route.ts - Updated for Consolidated Schema

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { brandProfiles, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type {
  CreateBrandProfileRequest,
  BrandProfileResponse,
  BrandProfileInsert,
} from "@/lib/db/types";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json<BrandProfileResponse>(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body: CreateBrandProfileRequest = await req.json();

    // Validate required fields
    if (!body.companyName?.trim()) {
      return NextResponse.json<BrandProfileResponse>(
        { success: false, error: "Company name is required" },
        { status: 400 }
      );
    }

    // Check if brand profile already exists
    const existingProfile = await db
      .select()
      .from(brandProfiles)
      .where(eq(brandProfiles.userId, session.user.id))
      .limit(1);

    if (existingProfile.length > 0) {
      return NextResponse.json<BrandProfileResponse>(
        { success: false, error: "Brand profile already exists" },
        { status: 409 } // Conflict
      );
    }

    const newProfile: BrandProfileInsert = {
      userId: session.user.id,
      companyName: body.companyName,
      websiteUrl: body.websiteUrl || null,
      brandCategory: body.brandCategory || null,
      revenueBracket: body.revenueBracket || null,
      platform: body.platform || null,
      currency: body.currency || "USD",
      skusCount: Number(body.skusCount) || 0,
      targetMarketLocation: body.targetMarketLocation || null,
      brandTone: body.brandTone || null,
      brandToneSample: body.brandToneSample || null,
      coreValues: body.coreValues || [],
      aspirationalIdentity: body.aspirationalIdentity || null,
      competitorBrands: body.competitorBrands || [],
      primaryAudience: body.primaryAudience || null,
      audienceDemographics: body.audienceDemographics || null,
      audienceFrustrations: body.audienceFrustrations || null,
      dreamOutcome: body.dreamOutcome || null,
      differentiators: body.differentiators || [],
      socialProofAssets: body.socialProofAssets || [],
      uniqueSellingProposition: body.uniqueSellingProposition || null,
      preferredChannels: body.preferredChannels || [],
      averageOrderValue: body.averageOrderValue || "0",
      topSellingProducts: body.topSellingProducts || [],
      targetCta: body.targetCta || "Shop Now",
      typicalDiscounts: body.typicalDiscounts || null,
      shippingPolicy: body.shippingPolicy || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const [created] = await db
      .insert(brandProfiles)
      .values(newProfile)
      .returning();

    // Update user's onboarding status
    await db
      .update(users)
      .set({ hasCompletedOnboarding: true, updatedAt: new Date() })
      .where(eq(users.id, session.user.id));

    return NextResponse.json<BrandProfileResponse>(
      {
        success: true,
        brandProfile: created,
        message: "Brand profile created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Brand profile creation error:", error);
    return NextResponse.json<BrandProfileResponse>(
      { success: false, error: "Failed to create brand profile" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json<BrandProfileResponse>(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch brand profile
    const profile = await db.query.brandProfiles.findFirst({
      where: eq(brandProfiles.userId, session.user.id),
    });

    if (!profile) {
      return NextResponse.json<BrandProfileResponse>(
        { success: false, error: "Brand profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json<BrandProfileResponse>({
      success: true,
      brandProfile: profile,
    });
  } catch (error) {
    console.error("Brand profile fetch error:", error);
    return NextResponse.json<BrandProfileResponse>(
      { success: false, error: "Failed to fetch brand profile" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json<BrandProfileResponse>(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body: Partial<CreateBrandProfileRequest> = await req.json();

    const sanitizedBody = Object.fromEntries(
      Object.entries(body).map(([key, value]) => {
        // JSONB arrays
        if (["targetMarketLocation", "primaryAudience"].includes(key)) {
          return [key, Array.isArray(value) ? value : value ? [value] : []];
        }

        // convert timestamp strings to Date objects
        if (
          ["createdAt", "updatedAt"].includes(key) &&
          typeof value === "string"
        ) {
          return [key, new Date(value)];
        }

        // leave arrays as-is
        if (Array.isArray(value)) return [key, value];

        // leave other primitive types
        return [key, value];
      })
    );

    console.log("backend", sanitizedBody);

    const preparedBody = {
      ...sanitizedBody,
    };

    // For update:
    const [updated] = await db
      .update(brandProfiles)
      .set(preparedBody)
      .where(eq(brandProfiles.userId, session.user.id))
      .returning();

    if (!updated) {
      return NextResponse.json<BrandProfileResponse>(
        { success: false, error: "Brand profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json<BrandProfileResponse>({
      success: true,
      brandProfile: updated,
      message: "Brand profile updated successfully",
    });
  } catch (error) {
    console.error("Brand profile update error:", error);
    return NextResponse.json<BrandProfileResponse>(
      { success: false, error: "Failed to update brand profile" },
      { status: 500 }
    );
  }
}
