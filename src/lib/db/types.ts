// db/types.ts
// ================================
// TypeScript types for Drizzle ORM v0.41+
// ================================

import {
  adRequests,
  apiKeys,
  batches,
  batchRows,
  brandProfiles,
  bulletRequests,
  descriptionRequests,
  exportsTable,
  headlineRequests,
  llmCalls,
  products,
  subjectLineRequests,
  usage,
  users,
} from "./schema";

// ================================
// Users
export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

// Brand Profiles
export type BrandProfile = typeof brandProfiles.$inferSelect;
export type BrandProfileInsert = typeof brandProfiles.$inferInsert;

// Products
export type Product = typeof products.$inferSelect;
export type ProductInsert = typeof products.$inferInsert;

// Headline Requests
export type HeadlineRequest = typeof headlineRequests.$inferSelect;
export type HeadlineRequestInsert = typeof headlineRequests.$inferInsert;

// Description Requests
export type DescriptionRequest = typeof descriptionRequests.$inferSelect;
export type DescriptionRequestInsert = typeof descriptionRequests.$inferInsert;

// Bullet Requests
export type BulletRequest = typeof bulletRequests.$inferSelect;
export type BulletRequestInsert = typeof bulletRequests.$inferInsert;

// Ad Requests
export type AdRequest = typeof adRequests.$inferSelect;
export type AdRequestInsert = typeof adRequests.$inferInsert;

// Subject Line Requests
export type SubjectLineRequest = typeof subjectLineRequests.$inferSelect;
export type SubjectLineRequestInsert = typeof subjectLineRequests.$inferInsert;

// Batches
export type Batch = typeof batches.$inferSelect;
export type BatchInsert = typeof batches.$inferInsert;

// Batch Rows
export type BatchRow = typeof batchRows.$inferSelect;
export type BatchRowInsert = typeof batchRows.$inferInsert;

// LLM Calls
export type LlmCall = typeof llmCalls.$inferSelect;
export type LlmCallInsert = typeof llmCalls.$inferInsert;

// API Keys
export type ApiKey = typeof apiKeys.$inferSelect;
export type ApiKeyInsert = typeof apiKeys.$inferInsert;

// Exports
export type ExportRow = typeof exportsTable.$inferSelect;
export type ExportRowInsert = typeof exportsTable.$inferInsert;

// Usage
export type UsageRow = typeof usage.$inferSelect;
export type UsageRowInsert = typeof usage.$inferInsert;
