// src/hooks/useBrandProfile.ts
"use client";

import { useState, useEffect } from "react";
import { CreateBrandProfileRequest } from "@/lib/db/types";

// Tool identifiers matching our configs
type ToolType =
  | "headline-generator"
  | "description-generator"
  | "benefit-bullets"
  | "ad-copy-generator"
  | "email-subject-line";

export function useBrandProfile() {
  const [brandProfile, setBrandProfile] =
    useState<CreateBrandProfileRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ==========================================
  // Fetch Brand Profile Once
  // ==========================================
  useEffect(() => {
    fetchBrandProfile();
  }, []);

  const fetchBrandProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/brand-profile");
      if (!response.ok) throw new Error("Failed to fetch brand profile");
      const data = await response.json();
      setBrandProfile(data.brandProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Failed to load brand profile:", err);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // 🧠 Smarter Suggestion Logic Based on Actual Brand Fields
  // =====================================================
  const getSuggestion = (
    tool: ToolType,
    field: string
  ): string | string[] | Record<string, any> | undefined => {
    if (!brandProfile) return undefined;

    const bp = brandProfile;

    const suggestionMap: Record<ToolType, Record<string, () => any>> = {
      // --------------------------------------------------
      // 📰 Headline Generator
      // --------------------------------------------------
      "headline-generator": {
        productName: () =>
          bp.topSellingProducts?.[0] || bp.companyName || "",
        primaryTarget: () =>
          bp.primaryAudience ||
          bp.audienceDemographics ||
          bp.targetMarketLocation ||
          "",
        mainBenefit: () =>
          bp.uniqueSellingProposition ||
          bp.differentiators?.[0] ||
          bp.coreValues?.[0] ||
          "",
        secondaryBenefit: () =>
          bp.differentiators?.[1] ||
          bp.coreValues?.[1] ||
          "",
        dreamOutcome: () => 
          bp.dreamOutcome || 
          bp.aspirationalIdentity || 
          "",
        howBetter: () =>
          bp.differentiators?.join(", ") ||
          (bp.competitorBrands?.length
            ? `Better than ${bp.competitorBrands.join(", ")}`
            : ""),
      },

      // --------------------------------------------------
      // 🧾 Product Description Generator
      // --------------------------------------------------
      "description-generator": {
        productName: () =>
          bp.topSellingProducts?.[0] || bp.companyName || "",
        features: () =>
          bp.differentiators || bp.coreValues || [],
        primaryTarget: () =>
          bp.primaryAudience || bp.audienceDemographics || "",
        mainBenefit: () =>
          bp.uniqueSellingProposition ||
          bp.dreamOutcome ||
          "",
        dreamOutcome: () =>
          bp.dreamOutcome || bp.aspirationalIdentity || "",
        tone: () => {
          // Map brand tone to our tone options
          const tone = bp.brandTone?.toLowerCase();
          if (tone?.includes("professional") || tone?.includes("formal")) return "professional";
          if (tone?.includes("casual") || tone?.includes("friendly")) return "casual-friendly";
          if (tone?.includes("luxury") || tone?.includes("sophisticated")) return "luxury-sophisticated";
          if (tone?.includes("technical")) return "technical-detailed";
          if (tone?.includes("energetic") || tone?.includes("exciting")) return "energetic-exciting";
          return "professional";
        },
        wordCount: () => "medium", // Default to medium length
      },

      // --------------------------------------------------
      // 💎 Benefit Bullets Converter
      // --------------------------------------------------
      "benefit-bullets": {
        features: () =>
          bp.differentiators ||
          bp.coreValues ||
          [],
        productContext: () =>
          bp.companyName ||
          `Our ${bp.topSellingProducts?.[0] || "product"}` ||
          "",
        targetAudience: () =>
          bp.primaryAudience || bp.audienceDemographics || "",
      },

      // --------------------------------------------------
      // 📢 Ad Copy Generator
      // --------------------------------------------------
      "ad-copy-generator": {
        productName: () =>
          bp.topSellingProducts?.[0] || bp.companyName || "",
        avatarPain: () =>
          bp.audienceFrustrations || "",
        dreamOutcome: () => 
          bp.dreamOutcome || 
          bp.aspirationalIdentity || 
          "",
        targetAudience: () => 
          bp.primaryAudience || 
          bp.audienceDemographics || 
          "",
        adObjective: () => "sales", // Default objective
        adFormat: () => "single-image", // Default format
        promotionType: () =>
          bp.typicalDiscounts ? "discount" : "none",
        promotionValue: () => bp.typicalDiscounts || "",
        duration: () => "Limited-time offer",
      },

      // --------------------------------------------------
      // ✉️ Email Subject Line Generator
      // --------------------------------------------------
      "email-subject-line": {
        emailType: () => "sale-promotion", // Default type
        offerDetails: () =>
          bp.typicalDiscounts ||
          bp.shippingPolicy ||
          "Exclusive offer just for you",
        timeLimit: () => "Ends soon!",
        personalizationFirstName: () => "{firstName}",
        subjectLineApproach: () => {
          // Map brand tone to subject line approach
          const tone = bp.brandTone?.toLowerCase();
          if (tone?.includes("luxury")) return "benefit";
          if (tone?.includes("energetic") || tone?.includes("exciting")) return "urgency";
          if (tone?.includes("friendly")) return "personalized";
          return "benefit";
        },
      },
    };

    const suggestion = suggestionMap[tool]?.[field];
    return suggestion ? suggestion() : undefined;
  };

  return {
    brandProfile,
    loading,
    error,
    getSuggestion,
    refetch: fetchBrandProfile,
  };
}