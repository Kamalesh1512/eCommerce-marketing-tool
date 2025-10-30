//lib/ai/prompt-templates/headline-generator
// ========================================
// Headline Generator Prompt
// ========================================
import { BrandProfile } from "@/lib/db/types";
import { formatBrandContext } from "./helper";
import { HeadlineGeneratorInput } from "@/lib/tools/types";

export function createHeadlinePrompt(
  input: HeadlineGeneratorInput,
  brandProfile: BrandProfile | null
): { system: string; user: string } {
  const system = `You are an expert e-commerce copywriter and offer architect. 
You craft high-converting headlines that turn ordinary products into irresistible offers.
Headlines must:
- Lead with the strongest benefit or transformation
- Be specific, concrete, and emotionally engaging
- Create curiosity, urgency, or desire
- Align with the brand's tone
- Use proven frameworks (Problem-Agitate-Solve (PAS), Before-After-Bridge (BAB), Features-Advantages-Benefits (FAB), The 4 U's: Useful, Urgent, Unique, Ultra-specific) if helpful, but benefit-driven is preferred`;

  const user = `${formatBrandContext(brandProfile)}

PRODUCT DETAILS:
- Product Name: ${input.productName}
- Target Customer: ${input.primaryTarget}
- Main Benefit: ${input.mainBenefit}
${
  input.secondaryBenefit ? `- Secondary Benefit: ${input.secondaryBenefit}` : ""
}
- Dream Outcome: ${input.dreamOutcome}
- How It's Better: ${input.howBetter}


TASK:
You are generating an “Offer Architect” headline for this product.
1. Ask yourself: What is the strongest benefit or transformation?
2. Consider the user’s dream outcome and why this product is better than alternatives.
3. Combine these elements into multiple compelling headlines.

Requirements:
- Generate 5 unique headlines
- Each headline must be concise (under 100 characters)
- For each headline, include:
  - "text": the headline itself
  - "type": framework or style used (PAS, BAB, FAB, 4U, Benefit-driven)
  - "score": conversion score 0-100 (based on clarity, emotional appeal, and persuasiveness)
  - "reasoning": 1 sentence explaining why this headline works
- Identify the TOP PICK with:
  - "text": the strongest headline
  - "reason": 1-2 sentence explanation why this is the best choice

Return ONLY JSON in this format:
{
  "headlines": [
    {
      "text": "The headline text here",
      "type": "PAS / BAB / FAB / 4U / Benefit-driven",
      "score": 95,
      "reasoning": "Why this headline works in one sentence"
    }
  ],
  "topPick": {
    "text": "The best headline",
    "reason": "Why this is the top choice in 1-2 sentences"
  }
}`;

  return { system, user };
}

///----old prompt

// const system = `You are an expert direct-response copywriter specializing in e-commerce headlines that convert. Your headlines follow proven frameworks like:
// - Problem-Agitate-Solve (PAS)
// - Before-After-Bridge (BAB)
// - Features-Advantages-Benefits (FAB)
// - The 4 U's: Useful, Urgent, Unique, Ultra-specific

// Your headlines are:
// 1. Benefit-driven (not feature-focused)
// 2. Specific and concrete (avoid vague language)
// 3. Emotionally compelling (tap into desires and pain points)
// 4. Action-oriented (create urgency)
// 5. Credible (include proof elements when possible)

// You must adapt your writing style to match the brand's tone while maintaining conversion effectiveness.`;

//   const user = `${formatBrandContext(brandProfile)}

// PRODUCT DETAILS:
// - Product Name: ${input.productName}
// - Primary Target Customer: ${input.primaryTarget}
// - Main Benefit: ${input.mainBenefit}
// ${input.secondaryBenefit ? `- Secondary Benefit: ${input.secondaryBenefit}` : ""}
// - Dream Outcome: ${input.dreamOutcome}
// - How It's Better: ${input.howBetter}

// TASK:
// Generate 5 compelling headline variations for this product. Each headline should:
// 1. Lead with the strongest benefit or transformation
// 2. Include specific, concrete details (not generic claims)
// 3. Create curiosity or urgency
// 4. Match the brand's tone
// 5. Be concise (under 100 characters preferred)

// For each headline, also provide:
// - Type/Framework used (e.g., "Benefit-driven", "Problem-solution", "Social proof")
// - Conversion score (0-100) based on directness, specificity, and emotional appeal
// - Brief explanation of why it works

// Then select the TOP PICK and explain why it's the strongest option.

// Return your response in this JSON format:
// {
//   "headlines": [
//     {
//       "text": "The headline text here",
//       "type": "benefit-driven",
//       "score": 95,
//       "reasoning": "Why this headline works in one sentence"
//     }
//   ],
//   "topPick": {
//     "text": "The best headline",
//     "reason": "Detailes explanation of why this is the top choice in 1-2 sentences"
//   }
// }`;
