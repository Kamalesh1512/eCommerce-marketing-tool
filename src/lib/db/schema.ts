// db/schema.ts - Optimized Schema for MVP Phase
import {
  pgTable,
  text,
  uuid,
  varchar,
  integer,
  jsonb,
  timestamp,
  boolean,
  numeric,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

// ========================================
// ENUMS
// ========================================

export const planEnum = pgEnum("plan_enum", [
  "free",
  "starter_monthly",
  "starter_yearly",
  "growth_monthly",
  "growth_yearly",
  "enterprise",
]);

export const requestStatusEnum = pgEnum("request_status_enum", [
  "pending",
  "processing",
  "completed",
  "failed",
]);

export const toolTypeEnum = pgEnum("tool_type_enum", [
  "headline",
  "description",
  "bullets",
  "ad_copy",
  "email_subject",
]);

// Brand-related enums
export const revenueBracketEnum = pgEnum("revenue_bracket_enum", [
  "< $100K",
  "$100K - $500K",
  "$500K - $1M",
  "$1M - $5M",
  "$5M - $10M",
  "$10M+",
]);

export const platformEnum = pgEnum("platform_enum", [
  "Shopify",
  "WooCommerce",
  "BigCommerce",
  "Magento",
  "Custom",
  "Other",
]);

export const brandToneEnum = pgEnum("brand_tone_enum", [
  "professional",
  "casual",
  "luxury",
  "playful",
  "technical",
  "energetic",
]);

// ========================================
// CORE TABLES
// ========================================

// Users Table
export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 320 }).notNull().unique(),
    name: text("name"),
    password: text("password"),
    image: text("image"),
    emailVerified: timestamp("email_verified", { mode: "date" }),
    plan: planEnum("plan").default("free").notNull(),
    isAdmin: boolean("is_admin").default(false).notNull(),

    // Denormalized for quick access
    hasCompletedOnboarding: boolean("has_completed_onboarding")
      .default(false)
      .notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: index("users_email_idx").on(table.email),
  })
);

// ========================================
// BRAND PROFILE TABLES (Consolidated)
// ========================================

// Main Brand Profile - Contains ALL brand data in one table for MVP
export const brandProfiles = pgTable(
  "brand_profiles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull()
      .unique(), // One brand profile per user for MVP

    // ========== Business Foundation ==========
    companyName: text("company_name").notNull(),
    websiteUrl: text("website_url"),
    brandCategory: text("brand_category"),

    // ========== Business Metrics ==========
    revenueBracket: revenueBracketEnum("revenue_bracket"),
    platform: platformEnum("platform"),
    currency: varchar("currency", { length: 8 }).default("USD").notNull(),
    skusCount: integer("skus_count").default(0).notNull(),
    targetMarketLocation: jsonb("target_market_location")
      .$type<string[]>()
      .default([]),

    // ========== Brand Identity (Voice & Tone) ==========
    brandTone: brandToneEnum("brand_tone"),
    brandToneSample: text("brand_tone_sample"),
    coreValues: jsonb("core_values").$type<string[]>().default([]),
    aspirationalIdentity: text("aspirational_identity"),
    competitorBrands: jsonb("competitor_brands").$type<string[]>().default([]),

    // ========== Target Audience ==========
    primaryAudience: jsonb("primary_audience").$type<string[]>().default([]),
    audienceDemographics: text("audience_demographics"),
    audienceFrustrations: text("audience_frustrations"),
    dreamOutcome: text("dream_outcome"),

    // ========== Value Proposition ==========
    differentiators: jsonb("differentiators").$type<string[]>().default([]),
    socialProofAssets: jsonb("social_proof_assets")
      .$type<string[]>()
      .default([]),
    uniqueSellingProposition: text("unique_selling_proposition"),

    // ========== Marketing Context ==========
    preferredChannels: jsonb("preferred_channels")
      .$type<string[]>()
      .default([]),
    averageOrderValue: numeric("average_order_value", {
      precision: 10,
      scale: 2,
    }),
    topSellingProducts: jsonb("top_selling_products")
      .$type<string[]>()
      .default([]),
    targetCta: text("target_cta").default("Shop Now"),
    typicalDiscounts: text("typical_discounts"),
    shippingPolicy: text("shipping_policy"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdx: index("brand_profiles_user_idx").on(table.userId),
  })
);

// ========================================
// CONTENT GENERATION TABLES
// ========================================

// Unified Generation Requests Table (replaces 5 separate tables)
export const generationRequests = pgTable(
  "generation_requests",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    brandProfileId: uuid("brand_profile_id")
      .references(() => brandProfiles.id, { onDelete: "cascade" })
      .notNull(),

    // Tool identification
    toolType: toolTypeEnum("tool_type").notNull(),

    // Input & Output (flexible JSON structure per tool)
    inputs: jsonb("inputs").$type<Record<string, any>>().notNull(),
    outputs: jsonb("outputs").$type<Record<string, any>>(),

    // Metadata
    status: requestStatusEnum("status").default("pending").notNull(),
    tokensUsed: integer("tokens_used"),
    costCents: integer("cost_cents"),
    processingTimeMs: integer("processing_time_ms"),
    errorMessage: text("error_message"),

    // Optional product association (for single-product generation)
    productSku: varchar("product_sku", { length: 128 }),
    productName: text("product_name"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdx: index("gen_requests_user_idx").on(table.userId),
    brandIdx: index("gen_requests_brand_idx").on(table.brandProfileId),
    toolTypeIdx: index("gen_requests_tool_type_idx").on(table.toolType),
    statusIdx: index("gen_requests_status_idx").on(table.status),
    createdAtIdx: index("gen_requests_created_at_idx").on(table.createdAt),
  })
);

// ========================================
// BATCH PROCESSING
// ========================================

export const batchJobs = pgTable(
  "batch_jobs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    brandProfileId: uuid("brand_profile_id")
      .references(() => brandProfiles.id, { onDelete: "cascade" })
      .notNull(),

    // Batch details
    filename: text("filename").notNull(),
    toolType: toolTypeEnum("tool_type").notNull(),
    totalRows: integer("total_rows").default(0).notNull(),
    processedRows: integer("processed_rows").default(0).notNull(),
    successfulRows: integer("successful_rows").default(0).notNull(),
    failedRows: integer("failed_rows").default(0).notNull(),

    // Status tracking
    status: requestStatusEnum("status").default("pending").notNull(),

    // Results
    inputFileUrl: text("input_file_url"),
    outputFileUrl: text("output_file_url"),
    errorSummary: text("error_summary"),

    // Timing
    startedAt: timestamp("started_at"),
    completedAt: timestamp("completed_at"),
    estimatedCompletionAt: timestamp("estimated_completion_at"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdateFn(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    userIdx: index("batch_jobs_user_idx").on(table.userId),
    statusIdx: index("batch_jobs_status_idx").on(table.status),
    createdAtIdx: index("batch_jobs_created_at_idx").on(table.createdAt),
  })
);

// Batch Rows - Individual results from batch processing
export const batchResults = pgTable(
  "batch_results",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    batchJobId: uuid("batch_job_id")
      .references(() => batchJobs.id, { onDelete: "cascade" })
      .notNull(),

    rowIndex: integer("row_index").notNull(),

    // Input & Output
    inputs: jsonb("inputs").$type<Record<string, any>>().notNull(),
    outputs: jsonb("outputs").$type<Record<string, any>>(),

    status: requestStatusEnum("status").default("pending").notNull(),
    errorMessage: text("error_message"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    batchJobIdx: index("batch_results_job_idx").on(table.batchJobId),
    statusIdx: index("batch_results_status_idx").on(table.status),
  })
);

// ========================================
// USAGE TRACKING (Simplified for MVP)
// ========================================

export const usageRecords = pgTable(
  "usage_records",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),

    // Monthly period tracking
    periodMonth: integer("period_month").notNull(), // 1-12
    periodYear: integer("period_year").notNull(), // 2025

    // Counters
    generationCount: integer("generation_count").default(0).notNull(),
    tokensUsed: integer("tokens_used").default(0).notNull(),
    batchJobsCount: integer("batch_jobs_count").default(0).notNull(),

    // Cost tracking (optional for MVP)
    totalCostCents: integer("total_cost_cents").default(0).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdateFn(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    userPeriodIdx: index("usage_records_user_period_idx").on(
      table.userId,
      table.periodYear,
      table.periodMonth
    ),
  })
);

// ========================================
// NEXTAUTH TABLES (Keep as-is)
// ========================================

export const accounts = pgTable(
  "accounts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    type: varchar("type", { length: 255 }).notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    idToken: text("id_token"),
    sessionState: varchar("session_state", { length: 255 }),
  },
  (table) => ({
    userIdx: index("accounts_user_idx").on(table.userId),
  })
);

export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionToken: varchar("session_token", { length: 255 }).notNull().unique(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable("verification_tokens", {
  identifier: varchar("identifier", { length: 255 }).notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const Waitlist = pgTable("waitlist", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email").notNull(),
});
// ========================================
// RELATIONS (for Drizzle ORM queries)
// ========================================

export const usersRelations = relations(users, ({ one, many }) => ({
  brandProfile: one(brandProfiles, {
    fields: [users.id],
    references: [brandProfiles.userId],
  }),
  generationRequests: many(generationRequests),
  batchJobs: many(batchJobs),
  usageRecords: many(usageRecords),
}));

export const brandProfilesRelations = relations(
  brandProfiles,
  ({ one, many }) => ({
    user: one(users, {
      fields: [brandProfiles.userId],
      references: [users.id],
    }),
    generationRequests: many(generationRequests),
    batchJobs: many(batchJobs),
  })
);

export const generationRequestsRelations = relations(
  generationRequests,
  ({ one }) => ({
    user: one(users, {
      fields: [generationRequests.userId],
      references: [users.id],
    }),
    brandProfile: one(brandProfiles, {
      fields: [generationRequests.brandProfileId],
      references: [brandProfiles.id],
    }),
  })
);

export const batchJobsRelations = relations(batchJobs, ({ one, many }) => ({
  user: one(users, {
    fields: [batchJobs.userId],
    references: [users.id],
  }),
  brandProfile: one(brandProfiles, {
    fields: [batchJobs.brandProfileId],
    references: [brandProfiles.id],
  }),
  results: many(batchResults),
}));

export const batchResultsRelations = relations(batchResults, ({ one }) => ({
  batchJob: one(batchJobs, {
    fields: [batchResults.batchJobId],
    references: [batchJobs.id],
  }),
}));
