// schema.ts - Drizzle ORM (pg) schema for Ecommerce Marketing Tool
import {
  pgTable,
  text,
  uuid,
  varchar,
  integer,
  json,
  timestamp,
  boolean,
  serial,
  numeric,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Enums
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
  "done",
  "failed",
]);
export const headlineTypeEnum = pgEnum("headline_type_enum", [
  "benefit-driven",
  "question",
  "how-to",
  "list",
  "challenge",
  "testimonial",
]);
export const toneEnum = pgEnum("tone_enum", [
  "professional",
  "casual-friendly",
  "luxury-sophisticated",
  "technical-detailed",
  "energetic-exciting",
]);
export const adFormatEnum = pgEnum("ad_format_enum", [
  "single-image",
  "carousel",
  "video",
  "story",
]);
export const adObjectiveEnum = pgEnum("ad_objective_enum", [
  "awareness",
  "traffic",
  "sales",
]);
export const emailTypeEnum = pgEnum("email_type_enum", [
  "abandoned-cart",
  "post-purchase",
  "new-product-launch",
  "sale-promotion",
  "win-back",
  "educational",
]);
export const batchStatusEnum = pgEnum("batch_status_enum", [
  "queued",
  "running",
  "completed",
  "failed",
  "cancelled",
]);

// Users Table
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: text("name"),
  password: text("password"), // nullable for OAuth users
  image: text("image"),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  plan: planEnum("plan").default("free").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Brand profiles — onboarded brand-level preferences
export const brandProfiles = pgTable("brand_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  company_name: text("company_name").notNull(),
  revenue_bracket: varchar("revenue_bracket", { length: 64 }),
  platform: varchar("platform", { length: 64 }), // e.g. Shopify, WooCommerce, Custom
  currency: varchar("currency", { length: 8 }).default("USD").notNull(),
  brand_tone_sample: text("brand_tone_sample"), // 1-5 sentences
  primary_audience: text("primary_audience"),
  skus_count: integer("skus_count").default(0).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// NextAuth Accounts Table
export const accounts = pgTable("accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  type: varchar("type", { length: 255 }).notNull(),
  provider: varchar("provider", { length: 255 }).notNull(),
  providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: varchar("token_type", { length: 255 }),
  scope: varchar("scope", { length: 255 }),
  id_token: text("id_token"),
  session_state: varchar("session_state", { length: 255 }),
});

// NextAuth Sessions Table
export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionToken: varchar("session_token", { length: 255 }).notNull().unique(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

// NextAuth Verification Tokens Table
export const verificationTokens = pgTable("verification_tokens", {
  identifier: varchar("identifier", { length: 255 }).notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

// Password Reset Tokens Table
export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Products / SKUs (merchant catalog)
export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  brand_profile_id: uuid("brand_profile_id")
    .references(() => brandProfiles.id)
    .notNull(),
  sku: varchar("sku", { length: 128 }).notNull(),
  product_name: text("product_name").notNull(),
  description: text("description"),
  features: json("features").$type<string[] | null>(), // array of strings
  differentiators: json("differentiators").$type<string[] | null>(),
  metadata: json("metadata").$type<Record<string, unknown> | null>(), // e.g. weight, color, dimensions
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Headline generation requests
export const headlineRequests = pgTable("headline_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  brand_profile_id: uuid("brand_profile_id")
    .references(() => brandProfiles.id)
    .notNull(),
  product_id: uuid("product_id").references(() => products.id),
  inputs: json("inputs").$type<Record<string, unknown>>().notNull(), // stores the request payload
  result: json("result").$type<Record<string, unknown> | null>(), // AI outputs
  headline_type: headlineTypeEnum("headline_type"),
  status: requestStatusEnum("status").default("pending").notNull(),
  cost_tokens: integer("cost_tokens"), // optional: token usage
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Description generation requests
export const descriptionRequests = pgTable("description_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  brand_profile_id: uuid("brand_profile_id")
    .references(() => brandProfiles.id)
    .notNull(),
  product_id: uuid("product_id").references(() => products.id),
  inputs: json("inputs").$type<Record<string, unknown>>().notNull(),
  result: json("result").$type<Record<string, unknown> | null>(),
  tone: toneEnum("tone"),
  word_count_option: varchar("word_count_option", { length: 32 }),
  status: requestStatusEnum("status").default("pending").notNull(),
  cost_tokens: integer("cost_tokens"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Benefit bullets
export const bulletRequests = pgTable("bullet_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  brand_profile_id: uuid("brand_profile_id")
    .references(() => brandProfiles.id)
    .notNull(),
  product_id: uuid("product_id").references(() => products.id),
  features: json("features").$type<string[]>().notNull(),
  result: json("result").$type<Record<string, any> | null>(),
  status: requestStatusEnum("status").default("pending").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Ad copy requests
export const adRequests = pgTable("ad_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  brand_profile_id: uuid("brand_profile_id")
    .references(() => brandProfiles.id)
    .notNull(),
  product_id: uuid("product_id").references(() => products.id),
  inputs: json("inputs").$type<Record<string, unknown>>().notNull(),
  ad_format: adFormatEnum("ad_format"),
  ad_objective: adObjectiveEnum("ad_objective"),
  result: json("result").$type<Record<string, unknown> | null>(),
  status: requestStatusEnum("status").default("pending").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Subject line requests
export const subjectLineRequests = pgTable("subjectline_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  brand_profile_id: uuid("brand_profile_id")
    .references(() => brandProfiles.id)
    .notNull(),
  inputs: json("inputs").$type<Record<string, unknown>>().notNull(),
  email_type: emailTypeEnum("email_type"),
  result: json("result").$type<Record<string, unknown> | null>(),
  status: requestStatusEnum("status").default("pending").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Batch processing tables
export const batches = pgTable("batches", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  brand_profile_id: uuid("brand_profile_id")
    .references(() => brandProfiles.id)
    .notNull(),
  filename: text("filename"),
  total_rows: integer("total_rows").default(0).notNull(),
  tools_requested: json("tools_requested").$type<string[]>(), // e.g. ["headlines","descriptions"]
  status: batchStatusEnum("status").default("queued").notNull(),
  result_urls: json("result_urls").$type<Record<string, string> | null>(), // download links per tool
  created_at: timestamp("created_at").defaultNow().notNull(),
  started_at: timestamp("started_at"),
  completed_at: timestamp("completed_at"),
  error_summary: text("error_summary"),
});

export const batchRows = pgTable("batch_rows", {
  id: uuid("id").defaultRandom().primaryKey(),
  batch_id: uuid("batch_id")
    .references(() => batches.id)
    .notNull(),
  row_index: integer("row_index").notNull(),
  input: json("input").$type<Record<string, unknown>>().notNull(), // raw row as JSON
  outputs: json("outputs").$type<Record<string, unknown> | null>(), // per-tool results
  status: requestStatusEnum("status").default("pending").notNull(),
  error_message: text("error_message"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// LLM call logging (token usage, latency) — keep for cost-analysis; can be rolled up/archived
export const llmCalls = pgTable("llm_calls", {
  id: uuid("id").defaultRandom().primaryKey(),
  request_table: varchar("request_table", { length: 128 }), // e.g. headline_requests
  request_id: uuid("request_id"), // link to the request
  model: varchar("model", { length: 128 }),
  prompt_hash: varchar("prompt_hash", { length: 128 }),
  prompt_tokens: integer("prompt_tokens"),
  completion_tokens: integer("completion_tokens"),
  total_tokens: integer("total_tokens"),
  cost_estimate_cents: integer("cost_estimate_cents"),
  duration_ms: integer("duration_ms"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// API Keys (for users wanting their own provider keys) - store encrypted in prod
export const apiKeys = pgTable("api_keys", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  provider: varchar("provider", { length: 64 }).notNull(), // openai, azure, etc
  key_encrypted: text("key_encrypted").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  last_used_at: timestamp("last_used_at"),
});

// Exports table - when user downloads CSV/zip
export const exportsTable = pgTable("exports", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  batch_id: uuid("batch_id").references(() => batches.id),
  tool: varchar("tool", { length: 64 }).notNull(), // headlines / descriptions / bullets
  url: text("url").notNull(),
  filename: text("filename"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Usage & quotas for enforcement
export const usage = pgTable("usage", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  period_start: timestamp("period_start").notNull(),
  period_end: timestamp("period_end").notNull(),
  llm_calls_count: integer("llm_calls_count").default(0).notNull(),
  llm_tokens_used: integer("llm_tokens_used").default(0).notNull(),
  agent_runs: integer("agent_runs").default(0).notNull(),
});
