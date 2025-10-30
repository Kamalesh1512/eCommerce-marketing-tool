//lib/ai/prompt-templates/helper

import { BrandProfile } from "@/lib/db/types";

// ========================================
// Helper: Format Brand Context
// ========================================

export function formatBrandContext(brandProfile: BrandProfile | null): string {
  if (!brandProfile) {
    return "No specific brand context available. Use general best practices.";
  }

  return `
BRAND CONTEXT:
- Company: ${brandProfile.companyName}
- Industry: ${brandProfile.brandCategory || "Not specified"}
- Brand Tone: ${brandProfile.brandTone || "Professional"}
- Target Audience: ${brandProfile.primaryAudience || "General consumers"}
- Dream Outcome: ${brandProfile.dreamOutcome || "Customer satisfaction"}
- Unique Selling Proposition: ${
    brandProfile.uniqueSellingProposition || "Quality products"
  }
${
  brandProfile.coreValues && brandProfile.coreValues.length > 0
    ? `- Core Values: ${brandProfile.coreValues.join(", ")}`
    : ""
}
${
  brandProfile.differentiators && brandProfile.differentiators.length > 0
    ? `- Key Differentiators: ${brandProfile.differentiators.join("; ")}`
    : ""
}
`.trim();
}


// ========================================
// Helper: Parse AI Response
// ========================================

export function parseAIResponse<T>(content: string): T {
  try {
    // Try to extract JSON if wrapped in markdown code blocks
    const jsonMatch = content.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
    const jsonString = jsonMatch ? jsonMatch[1] : content;
    
    return JSON.parse(jsonString.trim());
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    console.error("Raw content:", content);
    throw new Error("Failed to parse AI response as JSON");
  }
}
