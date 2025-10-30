// src/lib/tools/configs.tsx
"use client";
import {
  Target,
  FileText,
  Lightbulb,
  Megaphone,
  Mail,
  Zap,
  Users,
  TrendingUp,
  Heart,
  Brain,
} from "lucide-react";
import { ToolConfig } from "./types";
import { ResultCard } from "@/components/tools/shared/resultsDisplay";
import { proTipsConfig } from "../constants/proTips";

// ========================================
// Headline Generator Config
// ========================================
export const headlineGeneratorConfig: ToolConfig = {
  id: "headline-generator",
  name: "Headline Generator",
  description:
    "Transform boring headlines into irresistible offers that stop the scroll. Powered by advanced AI models.",
  icon: Target,
  gradient: {
    from: "primary",
    via: "purple-600",
    to: "pink-600",
  },
  proTips: proTipsConfig["headline-generator"],
  fields: [
    {
      type: "text",
      id: "productName",
      label: "Product Name",
      description: "What's your product or service called?",
      example: "FitFlow Pro",
      required: true,
    },
    {
      type: "text",
      id: "primaryTarget",
      label: "Primary Target Audience",
      description: "Who is this product for? Be specific.",
      example:
        "Busy professionals who want to stay fit without gym memberships",
      required: true,
    },
    {
      type: "textarea",
      id: "mainBenefit",
      label: "Main Benefit",
      description: "What's the #1 benefit or value proposition?",
      example:
        "Get personalized 15-minute workouts that fit into your schedule",
      required: true,
      rows: 2,
    },
    {
      type: "textarea",
      id: "secondaryBenefit",
      label: "Secondary Benefit",
      description: "Any additional benefits or supporting points?",
      example: "No equipment needed, works anywhere",
      rows: 2,
    },
    {
      type: "textarea",
      id: "dreamOutcome",
      label: "Dream Outcome",
      description: "What's the ultimate result your customer wants?",
      example:
        "Feel energized, look great, and have time for what matters most",
      required: true,
      rows: 2,
    },
    {
      type: "textarea",
      id: "howBetter",
      label: "How You're Different",
      description: "What makes your solution better than alternatives?",
      example:
        "AI adapts workouts to your fitness level and available time, unlike generic workout apps",
      required: true,
      rows: 2,
    },
  ],
  resultConfig: {
    emptyStateTitle: "No headlines yet",
    emptyStateDescription:
      "Fill in the form and generate compelling headlines to see results here",
    renderResults: (results) => {
      if (!results) return null;

      return (
        <div className="space-y-4">
          {results.topPick && (
            <ResultCard
              title="🎯 AI Top Pick"
              content={results.topPick.text}
              isTopPick={true}
              badges={[{ label: "Recommended", variant: "default" }]}
            >
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Why this works:</strong> {results.topPick.reason}
              </p>
            </ResultCard>
          )}

          <div className="space-y-3">
            {results.headlines
              ?.filter(
                (headline: any) => headline.text !== results.topPick?.text
              )
              .map((headline: any, idx: number) => (
                <ResultCard
                  key={idx}
                  content={headline.text}
                  badges={[
                    { label: headline.type, variant: "secondary" },
                    ...(headline.score
                      ? [
                          {
                            label: `Score: ${headline.score}/10`,
                            variant: "outline" as const,
                          },
                        ]
                      : []),
                  ]}
                />
              ))}
          </div>
        </div>
      );
    },
  },
};

// ========================================
// Product Description Generator Config
// ========================================
export const descriptionGeneratorConfig: ToolConfig = {
  id: "description-generator",
  name: "Product Description Generator",
  description:
    "Create compelling, conversion-focused product descriptions that sell.",
  icon: FileText,
  gradient: {
    from: "blue-500",
    via: "cyan-500",
    to: "teal-500",
  },
  proTips: proTipsConfig["description-generator"],
  fields: [
    {
      type: "text",
      id: "productName",
      label: "Product Name",
      description: "What's your product called?",
      example: "CloudSync Pro",
      required: true,
    },
    {
      type: "array",
      id: "features",
      label: "Key Features",
      description: "List the main features (press Enter to add each)",
      example: "Real-time sync, End-to-end encryption, Unlimited storage",
      required: true,
    },
    {
      type: "text",
      id: "primaryTarget",
      label: "Target Audience",
      description: "Who is this product for?",
      example: "Small business owners managing remote teams",
      required: true,
    },
    {
      type: "textarea",
      id: "mainBenefit",
      label: "Main Benefit",
      description: "What's the primary value proposition?",
      example: "Keep your team in sync without the complexity",
      required: true,
      rows: 2,
    },
    {
      type: "textarea",
      id: "dreamOutcome",
      label: "Dream Outcome",
      description: "What transformation does your product provide?",
      example: "Run your business smoothly with everyone on the same page",
      required: true,
      rows: 2,
    },
    {
      type: "select",
      id: "tone",
      label: "Tone of Voice",
      description: "How should the description sound?",
      required: true,
      options: [
        {
          value: "professional",
          label: "Professional",
          description: "Formal, business-focused",
        },
        {
          value: "casual-friendly",
          label: "Casual & Friendly",
          description: "Conversational, approachable",
        },
        {
          value: "luxury-sophisticated",
          label: "Luxury & Sophisticated",
          description: "Premium, elegant",
        },
        {
          value: "technical-detailed",
          label: "Technical & Detailed",
          description: "Data-driven, precise",
        },
        {
          value: "energetic-exciting",
          label: "Energetic & Exciting",
          description: "Bold, enthusiastic",
        },
      ],
    },
    {
      type: "select",
      id: "wordCount",
      label: "Length",
      description: "How long should the description be?",
      required: true,
      options: [
        {
          value: "low",
          label: "Short (150 words)",
          description: "Quick overview",
        },
        {
          value: "medium",
          label: "Medium (300 words)",
          description: "Balanced detail",
        },
        {
          value: "high",
          label: "Long (500+ words)",
          description: "Comprehensive",
        },
      ],
    },
  ],
  resultConfig: {
    emptyStateTitle: "No descriptions yet",
    emptyStateDescription: "Generate product descriptions to see results here",
    renderResults: (results) => {
      if (!results) return null;

      return (
        <div className="space-y-4">
          {results.bestOption &&
            results.descriptions?.[results.bestOption.index] && (
              <ResultCard
                title="✨ Best Option"
                content={results.descriptions[results.bestOption.index].text}
                isTopPick={true}
              >
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Why this works:</strong> {results.bestOption.reason}
                </p>
              </ResultCard>
            )}

          <div className="space-y-3">
            {results.descriptions
              ?.filter(
                (_: any, idx: number) => idx !== results.bestOption?.index
              )
              .map((desc: any, idx: number) => (
                <ResultCard
                  key={idx}
                  content={desc.text}
                  metadata={[
                    { label: "Word Count", value: desc.wordCount },
                    ...(desc.readabilityScore
                      ? [
                          {
                            label: "Readability",
                            value: `${desc.readabilityScore}/10`,
                          },
                        ]
                      : []),
                  ]}
                />
              ))}
          </div>
        </div>
      );
    },
  },
};

// ========================================
// Benefit Bullets Converter Config
// ========================================
export const benefitBulletsConfig: ToolConfig = {
  id: "benefit-bullets",
  name: "Benefit Bullets Converter",
  description:
    "Transform boring features into compelling benefits that drive action.",
  icon: Lightbulb,
  gradient: {
    from: "yellow-500",
    via: "orange-500",
    to: "red-500",
  },
  proTips: proTipsConfig["benefit-bullets"],
  fields: [
    {
      type: "array",
      id: "features",
      label: "Product Features",
      description: "List your product features (press Enter to add each)",
      example: "24/7 customer support, Free shipping, 30-day returns",
      required: true,
    },
    {
      type: "textarea",
      id: "productContext",
      label: "Product Context (Optional)",
      description: "Brief description of your product/service",
      example: "E-commerce platform for handmade crafts",
      rows: 2,
    },
    {
      type: "text",
      id: "targetAudience",
      label: "Target Audience (Optional)",
      description: "Who are you selling to?",
      example: "Artisans selling handmade products online",
    },
  ],
  resultConfig: {
    emptyStateTitle: "No benefits yet",
    emptyStateDescription:
      "Add your features to convert them into compelling benefits",
    renderResults: (results) => {
      if (!results) return null;

      return (
        <div className="space-y-3">
          {results.bullets.map((item: any, idx: number) => (
            <div
              key={idx}
              className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Feature:</p>
                    <p className="font-medium">{item.feature}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Benefit:</p>
                    <p className="text-primary font-medium">{item.benefit}</p>
                  </div>
                  {item.dreamOutcome && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Dream Outcome:
                      </p>
                      <p className="text-sm italic">{item.dreamOutcome}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    },
  },
};

// ========================================
// Ad Copy Generator Config
// ========================================
export const adCopyGeneratorConfig: ToolConfig = {
  id: "ad-copy-generator",
  name: "Ad Copy Generator",
  description:
    "Create scroll-stopping Facebook and Instagram ads that drive clicks and conversions.",
  icon: Megaphone,
  gradient: {
    from: "pink-500",
    via: "purple-500",
    to: "indigo-500",
  },
  proTips: proTipsConfig["ad-copy"],
  fields: [
    {
      type: "text",
      id: "productName",
      label: "Product/Service Name",
      description: "What are you advertising?",
      example: "SleepWell Pillow",
      required: true,
    },
    {
      type: "textarea",
      id: "avatarPain",
      label: "Customer Pain Point",
      description: "What specific problem does your target audience face?",
      example: "Waking up with neck pain and feeling unrested every morning",
      required: true,
      rows: 2,
    },
    {
      type: "textarea",
      id: "dreamOutcome",
      label: "Dream Outcome",
      description: "What's the ideal result they want to achieve?",
      example: "Wake up pain-free, energized, and ready to conquer the day",
      required: true,
      rows: 2,
    },
    {
      type: "select",
      id: "adObjective",
      label: "Ad Objective",
      description: "What's the goal of this ad?",
      required: true,
      options: [
        {
          value: "awareness",
          label: "Brand Awareness",
          description: "Introduce your brand to new people",
        },
        {
          value: "traffic",
          label: "Drive Traffic",
          description: "Get people to visit your website",
        },
        {
          value: "sales",
          label: "Generate Sales",
          description: "Direct product purchases",
        },
      ],
    },
    {
      type: "text",
      id: "targetAudience",
      label: "Target Audience",
      description: "Who are you targeting?",
      example: "Men and women 30-55 who work desk jobs",
      required: true,
    },
    {
      type: "select",
      id: "adFormat",
      label: "Ad Format",
      description: "What type of ad will you run?",
      required: true,
      options: [
        {
          value: "single-image",
          label: "Single Image",
          description: "One static image",
        },
        {
          value: "carousel",
          label: "Carousel",
          description: "Multiple swipeable images",
        },
        { value: "video", label: "Video", description: "Video content" },
        {
          value: "story",
          label: "Story",
          description: "Full-screen vertical format",
        },
      ],
    },
    {
      type: "select",
      id: "promotionType",
      label: "Promotion Type (Optional)",
      description: "Any special offer or promotion?",
      options: [
        { value: "none", label: "No Promotion" },
        { value: "discount", label: "Discount/Percentage Off" },
        { value: "bundle", label: "Bundle Deal" },
        { value: "free-shipping", label: "Free Shipping" },
        { value: "limited-time", label: "Limited Time Offer" },
      ],
    },
    {
      type: "text",
      id: "promotionValue",
      label: "Promotion Details (Optional)",
      description: "Specific offer details",
      example: "20% off, Buy 2 Get 1 Free, etc.",
      placeholder: "e.g., 30% OFF",
    },
    {
      type: "text",
      id: "duration",
      label: "Time Limit (Optional)",
      description: "Create urgency with a deadline",
      example: "Ends in 48 hours",
      placeholder: "e.g., 24 hours only",
    },
  ],
  resultConfig: {
    emptyStateTitle: "No ad copy yet",
    emptyStateDescription:
      "Generate compelling ad copy for Facebook and Instagram",
    renderResults: (results) => {
      if (!results) return null;

      return (
        <div className="space-y-6">
          {/* Facebook Ad */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              📘 Facebook Ad Copy
            </h3>

            <ResultCard
              title="Headline"
              content={results.facebookAd.headline}
              badges={[{ label: "Facebook", variant: "default" }]}
            />

            <ResultCard
              title="Primary Text"
              content={results.facebookAd.primaryText}
            />

            {results.facebookAd.description && (
              <ResultCard
                title="Description (Optional)"
                content={results.facebookAd.description}
              />
            )}

            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">Call-to-Action Button:</p>
              <p className="text-sm text-primary font-semibold mt-1">
                {results.facebookAd.cta}
              </p>
            </div>
          </div>

          {/* Instagram Ad */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              📸 Instagram Ad Copy
            </h3>

            <ResultCard
              title="Caption"
              content={results.instagramAd.caption}
              badges={[{ label: "Instagram", variant: "secondary" }]}
            />

            {results.instagramAd.hashtags &&
              results.instagramAd.hashtags.length > 0 && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium mb-2">
                    Suggested Hashtags:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {results.instagramAd.hashtags.map(
                      (tag: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-sm text-blue-600 dark:text-blue-400"
                        >
                          #{tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">Call-to-Action:</p>
              <p className="text-sm text-primary font-semibold mt-1">
                {results.instagramAd.cta}
              </p>
            </div>
          </div>
        </div>
      );
    },
  },
};

// ========================================
// Email Subject Line Generator Config
// ========================================
export const emailSubjectLineConfig: ToolConfig = {
  id: "email-subject-line",
  name: "Email Subject Line Generator",
  description:
    "Craft irresistible email subject lines that boost open rates and engagement.",
  icon: Mail,
  gradient: {
    from: "green-500",
    via: "emerald-500",
    to: "teal-500",
  },
  proTips: proTipsConfig["email-subject-lines"],
  fields: [
    {
      type: "select",
      id: "emailType",
      label: "Email Type",
      description: "What kind of email are you sending?",
      required: true,
      options: [
        {
          value: "abandoned-cart",
          label: "Abandoned Cart",
          description: "Recover lost sales",
        },
        {
          value: "post-purchase",
          label: "Post-Purchase",
          description: "Follow-up after sale",
        },
        {
          value: "new-product-launch",
          label: "New Product Launch",
          description: "Introduce new products",
        },
        {
          value: "sale-promotion",
          label: "Sale/Promotion",
          description: "Announce discounts",
        },
        {
          value: "win-back",
          label: "Win-Back",
          description: "Re-engage inactive customers",
        },
        {
          value: "educational",
          label: "Educational/Newsletter",
          description: "Share valuable content",
        },
      ],
    },
    {
      type: "textarea",
      id: "offerDetails",
      label: "Offer/Content Details",
      description: "What's in the email? What value are you providing?",
      example: "20% off all products, Free guide to better sleep",
      rows: 2,
    },
    {
      type: "text",
      id: "timeLimit",
      label: "Time Limit (Optional)",
      description: "Is there urgency? When does the offer end?",
      example: "Expires tonight at midnight",
      placeholder: "e.g., 24 hours left",
    },
    {
      type: "text",
      id: "personalizationFirstName",
      label: "Personalization - First Name (Optional)",
      description: "Use {firstName} as placeholder for testing",
      placeholder: "Leave blank or use {firstName}",
    },
    {
      type: "select",
      id: "subjectLineApproach",
      label: "Subject Line Approach",
      description: "What style resonates with your audience?",
      options: [
        {
          value: "curiosity",
          label: "Curiosity",
          description: "Create intrigue and mystery",
        },
        {
          value: "urgency",
          label: "Urgency",
          description: "Time-sensitive, act now",
        },
        {
          value: "benefit",
          label: "Benefit-Focused",
          description: "Clear value proposition",
        },
        {
          value: "personalized",
          label: "Personalized",
          description: "Feels one-on-one",
        },
        {
          value: "question",
          label: "Question",
          description: "Engage with a question",
        },
        {
          value: "social-proof",
          label: "Social Proof",
          description: "Leverage others' success",
        },
        { value: "fomo", label: "FOMO", description: "Fear of missing out" },
      ],
    },
  ],
  resultConfig: {
    emptyStateTitle: "No subject lines yet",
    emptyStateDescription: "Generate high-converting email subject lines",
    renderResults: (results) => {
      if (!results) return null;

      return (
        <div className="space-y-4">
          {results.bestSuggestion && (
            <ResultCard
              title="🏆 Best Suggestion"
              content={results.bestSuggestion.text}
              isTopPick={true}
            >
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Why this works:</strong> {results.bestSuggestion.reason}
              </p>
            </ResultCard>
          )}

          <div className="space-y-3">
            {results.subjectLines.map((line: any, idx: number) => (
              <ResultCard
                key={idx}
                content={line.text}
                badges={[
                  { label: line.approach, variant: "secondary" },
                  ...(line.score
                    ? [
                        {
                          label: `${line.score}/10`,
                          variant: "outline" as const,
                        },
                      ]
                    : []),
                ]}
                metadata={[{ label: "Characters", value: line.text.length }]}
              />
            ))}
          </div>

          {results.bestPractices && results.bestPractices.length > 0 && (
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                Best Practices for This Email Type
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {results.bestPractices.map((tip: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    },
  },
};

// ========================================
// Export all configs
// ========================================
export const toolConfigs: Record<string, ToolConfig> = {
  "headline-generator": headlineGeneratorConfig,
  "description-generator": descriptionGeneratorConfig,
  "benefit-bullets": benefitBulletsConfig,
  "ad-copy-generator": adCopyGeneratorConfig,
  "email-subject-line": emailSubjectLineConfig,
};

export function getToolConfig(toolId: string): ToolConfig | null {
  return toolConfigs[toolId] || null;
}

// ========================================
// Helper function to get all tools for dashboard
// ========================================
export function getAllTools() {
  return Object.values(toolConfigs);
}
