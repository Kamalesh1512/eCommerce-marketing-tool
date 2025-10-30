CREATE TYPE "public"."brand_tone_enum" AS ENUM('professional', 'casual', 'luxury', 'playful', 'technical', 'energetic');--> statement-breakpoint
CREATE TYPE "public"."plan_enum" AS ENUM('free', 'starter_monthly', 'starter_yearly', 'growth_monthly', 'growth_yearly', 'enterprise');--> statement-breakpoint
CREATE TYPE "public"."platform_enum" AS ENUM('Shopify', 'WooCommerce', 'BigCommerce', 'Magento', 'Custom', 'Other');--> statement-breakpoint
CREATE TYPE "public"."request_status_enum" AS ENUM('pending', 'processing', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."revenue_bracket_enum" AS ENUM('< $100K', '$100K - $500K', '$500K - $1M', '$1M - $5M', '$5M - $10M', '$10M+');--> statement-breakpoint
CREATE TYPE "public"."tool_type_enum" AS ENUM('headline', 'description', 'bullets', 'ad_copy', 'email_subject');--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "batch_jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"brand_profile_id" uuid NOT NULL,
	"filename" text NOT NULL,
	"tool_type" "tool_type_enum" NOT NULL,
	"total_rows" integer DEFAULT 0 NOT NULL,
	"processed_rows" integer DEFAULT 0 NOT NULL,
	"successful_rows" integer DEFAULT 0 NOT NULL,
	"failed_rows" integer DEFAULT 0 NOT NULL,
	"status" "request_status_enum" DEFAULT 'pending' NOT NULL,
	"input_file_url" text,
	"output_file_url" text,
	"error_summary" text,
	"started_at" timestamp,
	"completed_at" timestamp,
	"estimated_completion_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "batch_results" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"batch_job_id" uuid NOT NULL,
	"row_index" integer NOT NULL,
	"inputs" jsonb NOT NULL,
	"outputs" jsonb,
	"status" "request_status_enum" DEFAULT 'pending' NOT NULL,
	"error_message" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "brand_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"company_name" text NOT NULL,
	"website_url" text,
	"brand_category" text,
	"revenue_bracket" "revenue_bracket_enum",
	"platform" "platform_enum",
	"currency" varchar(8) DEFAULT 'USD' NOT NULL,
	"skus_count" integer DEFAULT 0 NOT NULL,
	"target_market_location" jsonb DEFAULT '[]'::jsonb,
	"brand_tone" "brand_tone_enum",
	"brand_tone_sample" text,
	"core_values" jsonb DEFAULT '[]'::jsonb,
	"aspirational_identity" text,
	"competitor_brands" jsonb DEFAULT '[]'::jsonb,
	"primary_audience" jsonb DEFAULT '[]'::jsonb,
	"audience_demographics" text,
	"audience_frustrations" text,
	"dream_outcome" text,
	"differentiators" jsonb DEFAULT '[]'::jsonb,
	"social_proof_assets" jsonb DEFAULT '[]'::jsonb,
	"unique_selling_proposition" text,
	"preferred_channels" jsonb DEFAULT '[]'::jsonb,
	"average_order_value" numeric(10, 2),
	"top_selling_products" jsonb DEFAULT '[]'::jsonb,
	"target_cta" text DEFAULT 'Shop Now',
	"typical_discounts" text,
	"shipping_policy" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "brand_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "generation_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"brand_profile_id" uuid NOT NULL,
	"tool_type" "tool_type_enum" NOT NULL,
	"inputs" jsonb NOT NULL,
	"outputs" jsonb,
	"status" "request_status_enum" DEFAULT 'pending' NOT NULL,
	"tokens_used" integer,
	"cost_cents" integer,
	"processing_time_ms" integer,
	"error_message" text,
	"product_sku" varchar(128),
	"product_name" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "password_reset_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "password_reset_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_token" varchar(255) NOT NULL,
	"user_id" uuid NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "sessions_session_token_unique" UNIQUE("session_token")
);
--> statement-breakpoint
CREATE TABLE "usage_records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"period_month" integer NOT NULL,
	"period_year" integer NOT NULL,
	"generation_count" integer DEFAULT 0 NOT NULL,
	"tokens_used" integer DEFAULT 0 NOT NULL,
	"batch_jobs_count" integer DEFAULT 0 NOT NULL,
	"total_cost_cents" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(320) NOT NULL,
	"name" text,
	"password" text,
	"image" text,
	"email_verified" timestamp,
	"plan" "plan_enum" DEFAULT 'free' NOT NULL,
	"is_admin" boolean DEFAULT false NOT NULL,
	"has_completed_onboarding" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification_tokens" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verification_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "batch_jobs" ADD CONSTRAINT "batch_jobs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "batch_jobs" ADD CONSTRAINT "batch_jobs_brand_profile_id_brand_profiles_id_fk" FOREIGN KEY ("brand_profile_id") REFERENCES "public"."brand_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "batch_results" ADD CONSTRAINT "batch_results_batch_job_id_batch_jobs_id_fk" FOREIGN KEY ("batch_job_id") REFERENCES "public"."batch_jobs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brand_profiles" ADD CONSTRAINT "brand_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generation_requests" ADD CONSTRAINT "generation_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generation_requests" ADD CONSTRAINT "generation_requests_brand_profile_id_brand_profiles_id_fk" FOREIGN KEY ("brand_profile_id") REFERENCES "public"."brand_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usage_records" ADD CONSTRAINT "usage_records_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "accounts_user_idx" ON "accounts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "batch_jobs_user_idx" ON "batch_jobs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "batch_jobs_status_idx" ON "batch_jobs" USING btree ("status");--> statement-breakpoint
CREATE INDEX "batch_jobs_created_at_idx" ON "batch_jobs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "batch_results_job_idx" ON "batch_results" USING btree ("batch_job_id");--> statement-breakpoint
CREATE INDEX "batch_results_status_idx" ON "batch_results" USING btree ("status");--> statement-breakpoint
CREATE INDEX "brand_profiles_user_idx" ON "brand_profiles" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "gen_requests_user_idx" ON "generation_requests" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "gen_requests_brand_idx" ON "generation_requests" USING btree ("brand_profile_id");--> statement-breakpoint
CREATE INDEX "gen_requests_tool_type_idx" ON "generation_requests" USING btree ("tool_type");--> statement-breakpoint
CREATE INDEX "gen_requests_status_idx" ON "generation_requests" USING btree ("status");--> statement-breakpoint
CREATE INDEX "gen_requests_created_at_idx" ON "generation_requests" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "usage_records_user_period_idx" ON "usage_records" USING btree ("user_id","period_year","period_month");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");