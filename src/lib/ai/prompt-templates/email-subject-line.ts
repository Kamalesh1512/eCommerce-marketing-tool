// lib/ai/prompt-templates/email-subject-line.ts
// ========================================
// Email Subject Line Generator Prompt
// ========================================

import { BrandProfile } from "@/lib/db/types";
import { formatBrandContext } from "./helper";
import { EmailSubjectLineInput } from "@/lib/tools/types";

export function createEmailSubjectLinePrompt(
  input: EmailSubjectLineInput,
  brandProfile: BrandProfile | null
): { system: string; user: string } {
  const system = `You are an email marketing expert who crafts subject lines that achieve 30%+ open rates. You understand the psychology of what makes people click.

Subject Line Principles:
1. CLARITY over cleverness (unless curiosity is the strategy)
2. Front-load the value (first 40 chars matter most on mobile)
3. Create urgency without being spammy
4. Use personalization strategically
5. Test emotional triggers (FOMO, curiosity, benefit, social proof)

Subject Line Approaches:
- CURIOSITY: Create intrigue, hint at value ("You won't believe what we just...")
- URGENCY: Time-sensitive, scarcity ("Last chance: 24 hours left")
- BENEFIT: Clear value proposition ("Save 30% on your favorite items")
- PERSONALIZED: Name, location, behavior-based ("{firstName}, this is for you")
- QUESTION: Engage with a query ("Ready to transform your mornings?")
- SOCIAL PROOF: Leverage others' success ("Join 10,000+ happy customers")
- FOMO: Fear of missing out ("Don't miss out on this exclusive offer")

Best Practices by Email Type:
- ABANDONED CART: Gentle reminder + incentive, avoid pressure
- POST-PURCHASE: Thank you + value-add (tips, upsell, referral)
- NEW PRODUCT LAUNCH: Excitement + exclusivity
- SALE/PROMOTION: Clear discount + urgency
- WIN-BACK: "We miss you" + compelling reason to return
- EDUCATIONAL: Value-first, benefit-focused learning

Optimization Rules:
- Keep under 50 characters (mobile-friendly)
- Avoid spam triggers (FREE, !!!, ALL CAPS)
- Use emojis sparingly (1-2 max, if brand-appropriate)
- Test with/without personalization
- A/B test different emotional angles`;

  const emailTypeContext: Record<string, string> = {
    "abandoned-cart": "gentle reminder about items left in cart, create urgency without pressure",
    "post-purchase": "thank customer, provide value (tips, upsell, ask for review)",
    "new-product-launch": "create excitement and exclusivity around new arrival",
    "sale-promotion": "clear discount value with time-based urgency",
    "win-back": "re-engage inactive customers with compelling incentive",
    "educational": "promise valuable content or learning",
  };

  const user = `${formatBrandContext(brandProfile)}

EMAIL CAMPAIGN DETAILS:
- Email Type: ${input.emailType}
- Offer/Content: ${input.offerDetails || "Not specified"}
${input.timeLimit ? `- Time Limit: ${input.timeLimit}` : ""}
${input.personalizationFirstName ? `- Personalization Available: Yes (use ${input.personalizationFirstName})` : ""}
- Desired Approach: ${input.subjectLineApproach || "benefit"}

EMAIL CONTEXT:
This is a ${input.emailType} email, so the subject line should ${emailTypeContext[input.emailType] || "drive opens and engagement"}.

TASK:
Generate 6 compelling email subject lines that maximize open rates for this ${input.emailType} email.

Requirements:
- Create 6 variations using different emotional triggers
- Keep each under 50 characters (mobile-optimized)
- Match the ${input.subjectLineApproach || "benefit"} approach when possible
- If personalization is available, include 2 personalized variants
${input.timeLimit ? `- Incorporate urgency: "${input.timeLimit}"` : ""}
${input.offerDetails ? `- Highlight offer: "${input.offerDetails}"` : ""}
- Use emojis only if appropriate for ${brandProfile?.brandTone || "professional"} brand tone
- Avoid spam triggers (no excessive caps, multiple exclamations)
- For each subject line provide:
  * The subject line text
  * The approach used (curiosity/urgency/benefit/personalized/question/social-proof/fomo)
  * Conversion score 1-10 (based on psychology, clarity, and urgency)
  * Length in characters

Then identify the BEST SUGGESTION with detailed reasoning.

Also provide 3-5 BEST PRACTICES specifically for ${input.emailType} emails.

Return your response in this JSON format:
{
  "subjectLines": [
    {
      "text": "Subject line text here",
      "approach": "curiosity / urgency / benefit / personalized / question / social-proof / fomo",
      "score": 9,
      "length": 42
    }
  ],
  "bestSuggestion": {
    "text": "The strongest subject line",
    "reason": "Why this will get the highest open rate (2-3 sentences with psychology behind it)"
  },
  "bestPractices": [
    "Best practice tip 1 for ${input.emailType} emails",
    "Best practice tip 2",
    "Best practice tip 3"
  ]
}`;

  return { system, user };
}