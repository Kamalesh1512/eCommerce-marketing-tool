// src/lib/tools/types.ts
import { LucideIcon } from "lucide-react";

// ========================================
// Base Tool Configuration
// ========================================
export interface ToolConfig {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  gradient: {
    from: string;
    via: string;
    to: string;
  };
  proTips: Array<{
    icon?: LucideIcon;
    title: string;
    description: string;
  }>;
  fields: ToolField[];
  resultConfig: ResultConfig;
}

// ========================================
// Field Types
// ========================================
export type ToolField =
  | TextField
  | TextAreaField
  | SelectField
  | ArrayField
  | NumberField;

interface BaseField {
  id: string;
  label: string;
  description: string;
  example?: string;
  required?: boolean;
  placeholder?: string;
}

export interface TextField extends BaseField {
  type: "text";
  defaultValue?: string;
}

export interface TextAreaField extends BaseField {
  type: "textarea";
  rows?: number;
  defaultValue?: string;
}

export interface SelectField extends BaseField {
  type: "select";
  options: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
  defaultValue?: string;
}

export interface ArrayField extends BaseField {
  type: "array";
  defaultValue?: string[];
}

export interface NumberField extends BaseField {
  type: "number";
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
}

// ========================================
// Result Configuration
// ========================================
export interface ResultConfig {
  emptyStateIcon?: LucideIcon;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  renderResults: (results: any) => React.ReactNode;
}

// ========================================
// Tool Input/Output Types
// ========================================

// Headline Generator
export interface HeadlineGeneratorInput {
  productName: string;
  primaryTarget: string;
  mainBenefit: string;
  secondaryBenefit?: string;
  dreamOutcome: string;
  howBetter: string;
}

export interface HeadlineGeneratorOutput {
  headlines: Array<{
    text: string;
    type: string;
    score?: number;
  }>;
  topPick?: {
    text: string;
    reason: string;
  };
}

// Product Description Generator
export interface DescriptionGeneratorInput {
  productName: string;
  features: string[];
  primaryTarget: string;
  mainBenefit: string;
  dreamOutcome: string;
  tone: "professional" | "casual-friendly" | "luxury-sophisticated" | "technical-detailed" | "energetic-exciting";
  wordCount: "low" | "medium" | "high";
}

export interface DescriptionGeneratorOutput {
  descriptions: Array<{
    text: string;
    wordCount: number;
    readabilityScore?: number;
  }>;
  bestOption?: {
    text: string;
    reason: string;
  };
}

// Benefit Bullets Converter
export interface BenefitBulletsInput {
  features: string[];
  productContext?: string;
  targetAudience?: string;
}

export interface BenefitBulletsOutput {
  bullets: Array<{
    feature: string;
    benefit: string;
    dreamOutcome?: string;
  }>;
}

// Ad Copy Generator
export interface AdCopyGeneratorInput {
  productName: string;
  avatarPain: string;
  dreamOutcome: string;
  adObjective: "awareness" | "traffic" | "sales";
  targetAudience: string;
  adFormat: "single-image" | "carousel" | "video" | "story";
  promotionType?: "discount" | "bundle" | "free-shipping" | "limited-time";
  promotionValue?: string;
  duration?: string;
}

export interface AdCopyGeneratorOutput {
  facebookAd: {
    headline: string;
    primaryText: string;
    description?: string;
    cta: string;
  };
  instagramAd: {
    caption: string;
    hashtags?: string[];
    cta: string;
  };
}

// Email Subject Line Generator
export interface EmailSubjectLineInput {
  emailType: "abandoned-cart" | "post-purchase" | "new-product-launch" | "sale-promotion" | "win-back" | "educational";
  offerDetails?: string;
  timeLimit?: string;
  personalizationFirstName?: string;
  subjectLineApproach?: "curiosity" | "urgency" | "benefit" | "personalized" | "question" | "social-proof" | "fomo";
}

export interface EmailSubjectLineOutput {
  subjectLines: Array<{
    text: string;
    approach: string;
    score?: number;
  }>;
  bestSuggestion?: {
    text: string;
    reason: string;
  };
  bestPractices?: string[];
}