// ========================================
// Benefit Bullets Prompt
// ========================================

import {  BrandProfile } from "@/lib/db/types";
import { formatBrandContext } from "./helper";
import { BenefitBulletsInput } from "@/lib/tools/types";

export function createBenefitBulletsPrompt(
  input: BenefitBulletsInput,
  brandProfile: BrandProfile | null
): { system: string; user: string } {
  const system = `You are an expert copywriter who specializes in converting technical features into customer-centric benefits using the "So What?" framework.

Your process:
1. For each feature, ask "So what?" to dig deeper
2. Connect the feature to a tangible benefit
3. Link the benefit to the emotional dream outcome
4. Use sensory, concrete language (avoid abstract claims)

Formula: [FEATURE] → [FUNCTIONAL BENEFIT] → [EMOTIONAL OUTCOME]

Example:
Feature: "100% Waterproof Fabric"
❌ Bad: "Made with waterproof material"
✅ Good: "Never worry about sudden downpours—your gear stays bone-dry so you can explore with confidence"

Your benefit bullets:
- Start with the benefit (not the feature)
- Use active, vivid language
- Include specific outcomes
- Tap into emotional desires (security, status, freedom, etc.)
- Keep each bullet concise and crisp.(1-2 sentences within 15 words max)`;

  const user = `${formatBrandContext(brandProfile)}

PRODUCT CONTEXT:
${input.productContext ? `- Product: ${input.productContext}` : ""}
${input.targetAudience ? `- Target Audience: ${input.targetAudience}` : ""}

FEATURES TO CONVERT:
${input.features.map((f, i) => `${i + 1}. ${f}`).join("\n")}

TASK:
For each feature above, create a compelling benefit bullet that:
1. Leads with the benefit (not the feature)
2. Connects to a tangible outcome
3. Uses sensory, specific language
4. Matches the brand's tone
5. Taps into emotional desires

Return your response in this JSON format:
{
  "bullets": [
    {
      "feature": "Original feature text",
      "benefit": "✓ Benefit-focused bullet: Strong opening that highlights the outcome and emotional impact",
      "dreamOutcome": "The ultimate transformation this enables"
    }
  ]
}

Make sure each bullet starts with a checkmark symbol (✓) for visual consistency.`;

  return { system, user };
}