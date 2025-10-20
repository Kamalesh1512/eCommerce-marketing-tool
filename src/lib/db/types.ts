// db/types.ts - Optimized TypeScript types for MVP Schema
import {
  users,
  brandProfiles,
  generationRequests,
  batchJobs,
  batchResults,
  usageRecords,
  accounts,
  sessions,
} from "./schema";

// ========================================
// Core Tables
// ========================================

export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

export type BrandProfile = typeof brandProfiles.$inferSelect;
export type BrandProfileInsert = typeof brandProfiles.$inferInsert;

export type GenerationRequest = typeof generationRequests.$inferSelect;
export type GenerationRequestInsert = typeof generationRequests.$inferInsert;

export type BatchJob = typeof batchJobs.$inferSelect;
export type BatchJobInsert = typeof batchJobs.$inferInsert;

export type BatchResult = typeof batchResults.$inferSelect;
export type BatchResultInsert = typeof batchResults.$inferInsert;

export type UsageRecord = typeof usageRecords.$inferSelect;
export type UsageRecordInsert = typeof usageRecords.$inferInsert;

// NextAuth types
export type Account = typeof accounts.$inferSelect;
export type Session = typeof sessions.$inferSelect;

// ========================================
// Enums (for type safety)
// ========================================

export type PlanType = "free" | "starter_monthly" | "starter_yearly" | "growth_monthly" | "growth_yearly" | "enterprise";

export type RequestStatus = "pending" | "processing" | "completed" | "failed";

export type ToolType = "headline" | "description" | "bullets" | "ad_copy" | "email_subject";

export type RevenueBracket = "< $100K" | "$100K - $500K" | "$500K - $1M" | "$1M - $5M" | "$5M - $10M" | "$10M+";

export type Platform = "Shopify" | "WooCommerce" | "BigCommerce" | "Magento" | "Custom" | "Other";

export type BrandTone = "professional" | "casual" | "luxury" | "playful" | "technical" | "energetic";

// ========================================
// Tool-Specific Input/Output Types
// ========================================

// Headline Generator
export interface HeadlineGeneratorInput {
  productName: string;
  primaryTarget: string;
  mainBenefit: string;
  secondaryBenefit?: string;
  dreamOutcome: string;
  howBetter: string;
  headlineType?: "benefit-driven" | "question" | "how-to" | "list" | "challenge" | "testimonial";
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
  wordCount: "low" | "medium" | "high"; // 150, 300, 500+ words
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
  targetAudience: {
    age?: string;
    interests?: string[];
  };
  adFormat: "single-image" | "carousel" | "video" | "story";
  promotionDetails?: {
    type?: "discount" | "bundle" | "free-shipping";
    value?: string;
  };
  duration?: string;
  characterLimit?: number;
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
  additionalDetails?: Record<string, any>;
  subjectLineApproach?: "curiosity" | "urgency" | "benefit" | "personalized" | "question" | "social-proof" | "fomo";
  personalization?: {
    firstName?: string;
    cartValue?: string;
  };
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

// ========================================
// API Request/Response Types
// ========================================

// Brand Profile API
export interface CreateBrandProfileRequest {
  // Business Foundation
  companyName: string;
  websiteUrl?: string;
  brandCategory?: string;
  
  // Business Metrics
  revenueBracket?: RevenueBracket;
  platform?: Platform;
  currency?: string;
  skusCount?: number;
  targetMarketLocation?: string;
  
  // Brand Identity
  brandTone?: BrandTone;
  brandToneSample?: string;
  coreValues?: string[];
  aspirationalIdentity?: string;
  competitorBrands?: string[];
  
  // Target Audience
  primaryAudience?: string;
  audienceDemographics?: string;
  audienceFrustrations?: string;
  dreamOutcome?: string;
  
  // Value Proposition
  differentiators?: string[];
  socialProofAssets?: string[];
  uniqueSellingProposition?: string;
  
  // Marketing Context
  preferredChannels?: string[];
  averageOrderValue?: string;
  topSellingProducts?: string[];
  targetCta?: string;
  typicalDiscounts?: string;
  shippingPolicy?: string;
}

export interface BrandProfileResponse {
  success: boolean;
  brandProfile?: BrandProfile;
  message?: string;
  error?: string;
}

// Generation Request API
export interface CreateGenerationRequest<T = any> {
  toolType: ToolType;
  inputs: T;
  productSku?: string;
  productName?: string;
}

export interface GenerationResponse<T = any> {
  success: boolean;
  request?: GenerationRequest;
  outputs?: T;
  message?: string;
  error?: string;
}

// Batch Job API
export interface CreateBatchJobRequest {
  toolType: ToolType;
  file: File | string; // File object or CSV string
  filename?: string;
}

export interface BatchJobResponse {
  success: boolean;
  batchJob?: BatchJob;
  message?: string;
  error?: string;
}

export interface BatchJobStatusResponse {
  batchJob: BatchJob;
  progress: {
    total: number;
    processed: number;
    successful: number;
    failed: number;
    percentComplete: number;
  };
  estimatedTimeRemaining?: number; // seconds
}

// ========================================
// Frontend Data Types
// ========================================

// Complete user profile with brand data
export interface UserProfile {
  user: User;
  brandProfile: BrandProfile | null;
  usageStats?: {
    currentPeriod: UsageRecord;
    generationCount: number;
    remainingGenerations: number;
    planLimit: number;
  };
}

// Dashboard stats
export interface DashboardStats {
  totalGenerations: number;
  generationsThisMonth: number;
  successRate: number;
  mostUsedTool: ToolType;
  recentRequests: GenerationRequest[];
  activeBatchJobs: BatchJob[];
}

// Tool usage statistics
export interface ToolUsageStats {
  toolType: ToolType;
  totalRequests: number;
  successfulRequests: number;
  avgProcessingTime: number;
  avgTokensUsed: number;
  totalCostCents: number;
}

// ========================================
// Helper Types
// ========================================

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  error: string;
  details?: ValidationError[];
  code?: string;
}

// ========================================
// Constants for Type Guards
// ========================================

export const TOOL_TYPES: ToolType[] = ["headline", "description", "bullets", "ad_copy", "email_subject"];

export const REQUEST_STATUSES: RequestStatus[] = ["pending", "processing", "completed", "failed"];

export const BRAND_TONES: BrandTone[] = ["professional", "casual", "luxury", "playful", "technical", "energetic"];

// Type guards
export const isValidToolType = (value: string): value is ToolType => {
  return TOOL_TYPES.includes(value as ToolType);
};

export const isValidRequestStatus = (value: string): value is RequestStatus => {
  return REQUEST_STATUSES.includes(value as RequestStatus);
};

export const isValidBrandTone = (value: string): value is BrandTone => {
  return BRAND_TONES.includes(value as BrandTone);
};