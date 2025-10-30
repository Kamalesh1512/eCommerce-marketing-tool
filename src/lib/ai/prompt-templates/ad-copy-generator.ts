// lib/ai/prompt-templates/ad-copy-generator.ts
// ========================================
// Ad Copy Generator Prompt
// ========================================

import { BrandProfile } from "@/lib/db/types";
import { formatBrandContext } from "./helper";
import { AdCopyGeneratorInput } from "@/lib/tools/types";

export function createAdCopyPrompt(
  input: AdCopyGeneratorInput,
  brandProfile: BrandProfile | null
): { system: string; user: string } {
  const system = `You are an expert paid advertising copywriter specializing in Facebook and Instagram ads that stop the scroll and drive conversions.

Your advertising framework:
1. HOOK: First 3 seconds - pattern interrupt that grabs attention
2. AGITATE: Amplify the pain point or desire
3. SOLUTION: Position the product as the bridge
4. PROOF/TRUST: Add credibility elements
5. CTA: Clear, action-oriented next step

Facebook Ad Best Practices:
- Primary text: First 125 characters are crucial (shown before "See More")
- Headline: 5-7 words, benefit-focused
- Description: Optional supporting detail
- Use "you" language - speak directly to one person
- Create urgency without being pushy

Instagram Ad Best Practices:
- Caption: Conversational, story-driven
- Start strong - first line must hook
- Use emojis strategically for visual breaks
- Include 5-10 relevant hashtags
- Natural CTA that fits the platform vibe

Your copy must:
- Match the ad objective (awareness/traffic/sales)
- Adapt to the ad format (image/carousel/video/story)
- Align with brand tone
- Create emotional resonance
- Drive specific action`;

  const user = `${formatBrandContext(brandProfile)}

AD CAMPAIGN DETAILS:
- Product/Service: ${input.productName}
- Target Customer Pain: ${input.avatarPain}
- Dream Outcome: ${input.dreamOutcome}
- Ad Objective: ${input.adObjective}
- Target Audience: ${input.targetAudience}
- Ad Format: ${input.adFormat}
${
  input.promotionType
    ? `- Promotion: ${input.promotionType}${
        input.promotionValue ? ` (${input.promotionValue})` : ""
      }`
    : ""
}
${input.duration ? `- Time Limit: ${input.duration}` : ""}

${input.duration ? `- Time Limit: ${input.duration}` : ""}

TASK:
Create scroll-stopping ad copy for both Facebook and Instagram that converts ${
    input.targetAudience
  } who struggle with "${input.avatarPain}" and dream of "${
    input.dreamOutcome
  }".

Requirements:
1. FACEBOOK AD:
   - Primary Text: 150-200 words (first 125 chars must hook)
   - Headline: 5-7 words, benefit-driven
   - Description: Optional 1-line supporting detail
   - CTA: Button text (Shop Now, Learn More, Sign Up, etc.)

2. INSTAGRAM AD:
   - Caption: 150-200 words, conversational and story-driven
   - Include 5-10 relevant hashtags
   - CTA: Natural call-to-action that fits Instagram's vibe

Both ads must:
- Lead with the strongest hook for ${input.adFormat} format
- Address the pain: "${input.avatarPain}"
- Paint the dream outcome: "${input.dreamOutcome}"
- Match ${input.adObjective} objective
${
  input.promotionType
    ? `- Promotion: ${input.promotionType}${
        input.promotionValue ? ` (${input.promotionValue})` : ""
      }`
    : ""
}
${input.duration ? `- Time Limit: ${input.duration}` : ""}

${input.duration ? `- Create urgency with "${input.duration}"` : ""}
- Use brand tone: ${brandProfile?.brandTone || "authentic and persuasive"}

Return your response in this JSON format:
{
  "facebookAd": {
    "headline": "5-7 word benefit headline",
    "primaryText": "Full primary text with proper paragraphs using \\n\\n for breaks. First 125 characters must hook.",
    "description": "Optional one-line description",
    "cta": "Shop Now / Learn More / Sign Up / etc."
  },
  "instagramAd": {
    "caption": "Conversational caption with emojis and proper line breaks using \\n\\n",
    "hashtags": ["hashtag1", "hashtag2", "hashtag3", "hashtag4", "hashtag5"],
    "cta": "Natural Instagram CTA like 'Link in bio' or 'Tap to shop'"
  }
}`;

  return { system, user };
}
