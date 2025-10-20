// import { NextRequest, NextResponse } from "next/server";
// import { authOptions } from "@/lib/auth";
// import { db } from "@/lib/db";
// import { brandProfiles } from "@/lib/db/schema";
// import { eq } from "drizzle-orm";
// import { getServerSession } from "next-auth";

// // GET - Fetch user's brand profile
// export async function GET(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user?.id) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const [brandProfile] = await db
//       .select()
//       .from(brandProfiles)
//       .where(eq(brandProfiles.user_id, session.user.id))
//       .limit(1);

//     if (!brandProfile) {
//       return NextResponse.json(
//         { error: "Brand profile not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(brandProfile, { status: 200 });
//   } catch (error) {
//     console.error("Get brand profile error:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch brand profile" },
//       { status: 500 }
//     );
//   }
// }

// // POST - Create brand profile
// export async function POST(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user?.id) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const data = await req.json();

//     // Validate required fields
//     if (!data.companyName) {
//       return NextResponse.json(
//         { error: "Company name is required" },
//         { status: 400 }
//       );
//     }

//     // Check if profile already exists
//     const [existingProfile] = await db
//       .select()
//       .from(brandProfiles)
//       .where(eq(brandProfiles.user_id, session.user.id))
//       .limit(1);

//     if (existingProfile) {
//       return NextResponse.json(
//         { error: "Brand profile already exists" },
//         { status: 409 }
//       );
//     }

//     // Create brand profile
//     const [newProfile] = await db
//       .insert(brandProfiles)
//       .values({
//         user_id: session.user.id,
//         company_name: data.companyName,
//         revenue_bracket: data.revenueBracket || null,
//         platform: data.platform || null,
//         currency: data.currency || "USD",
//         brand_tone_sample: data.brandToneSample || null,
//         primary_audience: data.primaryAudience || null,
//         skus_count: data.skusCount || 0,
//       })
//       .returning();

//     return NextResponse.json(
//       { message: "Brand profile created successfully", profile: newProfile },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Create brand profile error:", error);
//     return NextResponse.json(
//       { error: "Failed to create brand profile" },
//       { status: 500 }
//     );
//   }
// }

// // PUT - Update brand profile
// export async function PUT(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user?.id) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const data = await req.json();

//     const [updatedProfile] = await db
//       .update(brandProfiles)
//       .set({
//         company_name: data.companyName,
//         revenue_bracket: data.revenueBracket,
//         platform: data.platform,
//         currency: data.currency,
//         brand_tone_sample: data.brandToneSample,
//         primary_audience: data.primaryAudience,
//         skus_count: data.skusCount,
//       })
//       .where(eq(brandProfiles.user_id, session.user.id))
//       .returning();

//     if (!updatedProfile) {
//       return NextResponse.json(
//         { error: "Brand profile not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { message: "Brand profile updated successfully", profile: updatedProfile },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Update brand profile error:", error);
//     return NextResponse.json(
//       { error: "Failed to update brand profile" },
//       { status: 500 }
//     );
//   }
// }

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

    // Create new profile
    const [created] = await db
      .insert(brandProfiles)
      .values({
        userId: session.user.id,

        // Business Foundation
        companyName: body.companyName,
        websiteUrl: body.websiteUrl || null,
        brandCategory: body.brandCategory || null,

        // Business Metrics
        revenueBracket: body.revenueBracket || null,
        platform: body.platform || null,
        currency: body.currency || "USD",
        skusCount: body.skusCount ? Number(body.skusCount) : 0,
        targetMarketLocation: body.targetMarketLocation || null,

        // Brand Identity
        brandTone: body.brandTone || null,
        brandToneSample: body.brandToneSample || null,
        coreValues: body.coreValues || [],
        aspirationalIdentity: body.aspirationalIdentity || null,
        competitorBrands: body.competitorBrands || [],

        // Target Audience
        primaryAudience: body.primaryAudience || null,
        audienceDemographics: body.audienceDemographics || null,
        audienceFrustrations: body.audienceFrustrations || null,
        dreamOutcome: body.dreamOutcome || null,

        // Value Proposition
        differentiators: body.differentiators || [],
        socialProofAssets: body.socialProofAssets || [],
        uniqueSellingProposition: body.uniqueSellingProposition || null,

        // Marketing Context
        preferredChannels: body.preferredChannels || [],
        averageOrderValue: body.averageOrderValue
          ? body.averageOrderValue
          : "0",
        topSellingProducts: body.topSellingProducts || [],
        targetCta: body.targetCta || "Shop Now",
        typicalDiscounts: body.typicalDiscounts || null,
        shippingPolicy: body.shippingPolicy || null,

        // Timestamps
        createdAt: new Date(),
        updatedAt: new Date(),
      })
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

    // Update only provided fields
    const [updated] = await db
      .update(brandProfiles)
      .set({
        ...body,
        updatedAt: new Date(),
      })
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
