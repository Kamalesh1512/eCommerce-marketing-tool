// ========================================
// Product Description Prompt
// ========================================

import { BrandProfile } from "@/lib/db/types";
import { formatBrandContext } from "./helper";
import { DescriptionGeneratorInput } from "@/lib/tools/types";

export function createDescriptionPrompt(
  input: DescriptionGeneratorInput,
  brandProfile: BrandProfile | null
): { system: string; user: string } {
  const system = `You are an expert e-commerce copywriter who writes product descriptions that sell. You understand that customers don't buy products—they buy better versions of themselves.

Your descriptions follow this proven structure:
1. HOOK: Aspirational opening that paints the dream outcome
2. PROBLEM AGITATION: Identify the pain points your audience faces
3. SOLUTION INTRODUCTION: Position the product as the bridge
4. BENEFIT-DRIVEN FEATURES: Translate each feature into a tangible benefit
5. SOCIAL PROOF: Reinforce credibility (when available)
6. CALL TO ACTION: Clear next step

Your writing style:
- Uses sensory language and concrete details
- Focuses on transformation, not specifications
- Creates an emotional narrative
- Breaks up text with short paragraphs for readability
- Uses power words that drive action

You adapt to different tones while maintaining persuasive effectiveness.`;

  const wordCountMap = {
    low: "150 words",
    medium: "300 words",
    high: "500+ words"
  };

  const user = `${formatBrandContext(brandProfile)}

PRODUCT DETAILS:
- Product Name: ${input.productName}
- Features: ${input.features.join(", ")}
- Primary Target: ${input.primaryTarget}
- Main Benefit: ${input.mainBenefit}
- Dream Outcome: ${input.dreamOutcome}
- Tone: ${input.tone}
- Target Length: ${wordCountMap[input.wordCount]}

TASK:
Write 2 product description variations following the structure above. 

Requirements:
- Match the specified tone: ${input.tone}
- Target approximately ${wordCountMap[input.wordCount]}
- Transform every feature into a customer benefit
- Use the brand voice and values provided
- Make it scannable with short paragraphs
- End with a compelling call-to-action

For each description, provide:
- The full description text
- Actual word count
- Readability score (Flesch Reading Ease: 60-70 is ideal for e-commerce)
- Key strengths

Then recommend the BEST OPTION with reasoning.

Return your response in this JSON format:
{
  "descriptions": [
    {
      "text": "Full description here with proper paragraph breaks using \\n\\n",
      "wordCount": 287,
      "readabilityScore": 65,
      "strengths": ["Clear value prop", "Strong CTA", "Benefit-focused"]
    }
  ],
  "bestOption": {
    "index": 0,
    "reason": "Why this is the strongest option"
  }
}`;

  return { system, user };
}

