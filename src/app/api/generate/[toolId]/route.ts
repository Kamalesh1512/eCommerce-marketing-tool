// app/api/generate/[toolId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { AIModel, AIProvider } from "@/lib/ai/types";
import { GenerationResponse } from "@/lib/db/types";
import { db } from "@/lib/db";
import { brandProfiles, generationRequests } from "@/lib/db/schema";
import { createHeadlinePrompt } from "@/lib/ai/prompt-templates/headline-generator";
import { createDescriptionPrompt } from "@/lib/ai/prompt-templates/product-description";
import { createBenefitBulletsPrompt } from "@/lib/ai/prompt-templates/benefit-bullets";
import { createAdCopyPrompt } from "@/lib/ai/prompt-templates/ad-copy-generator";
import { createEmailSubjectLinePrompt } from "@/lib/ai/prompt-templates/email-subject-line";
import { generateWithAI } from "@/lib/ai";
import { parseAIResponse } from "@/lib/ai/prompt-templates/helper";
import { isValidProviderModel } from "@/lib/ai/helper";
import {
  AdCopyGeneratorInput,
  AdCopyGeneratorOutput,
  BenefitBulletsInput,
  BenefitBulletsOutput,
  DescriptionGeneratorInput,
  DescriptionGeneratorOutput,
  EmailSubjectLineInput,
  EmailSubjectLineOutput,
  HeadlineGeneratorInput,
  HeadlineGeneratorOutput,
} from "@/lib/tools/types";

// ========================================
// Type Guards for Input Validation
// ========================================

function isHeadlineInput(body: any): body is HeadlineGeneratorInput {
  return (
    body.productName &&
    body.primaryTarget &&
    body.mainBenefit &&
    body.dreamOutcome &&
    body.howBetter
  );
}

function isDescriptionInput(body: any): body is DescriptionGeneratorInput {
  return (
    body.productName &&
    Array.isArray(body.features) &&
    body.features.length > 0 &&
    body.primaryTarget &&
    body.mainBenefit &&
    body.dreamOutcome &&
    body.tone &&
    body.wordCount
  );
}

function isBenefitBulletsInput(body: any): body is BenefitBulletsInput {
  return Array.isArray(body.features) && body.features.length > 0;
}

function isAdCopyInput(body: any): body is AdCopyGeneratorInput {
  return (
    body.productName &&
    body.avatarPain &&
    body.dreamOutcome &&
    body.adObjective &&
    body.targetAudience &&
    body.adFormat
  );
}

function isEmailSubjectLineInput(body: any): body is EmailSubjectLineInput {
  return body.emailType;
}

// ========================================
// Tool Type Mapping
// ========================================

type ToolType =
  | "headline"
  | "description"
  | "benefit-bullets"
  | "ad-copy"
  | "email-subject-line";

const toolIdToType: Record<string, ToolType> = {
  "headline-generator": "headline",
  "description-generator": "description",
  "benefit-bullets": "benefit-bullets",
  "ad-copy-generator": "ad-copy",
  "email-subject-line": "email-subject-line",
};

// ========================================
// Main POST Handler
// ========================================
interface toolProps {
  params: Promise<{
    toolId: string;
  }>;
}

export async function POST(req: NextRequest, { params }: toolProps) {
  const startTime = Date.now();
  const { toolId } = await params;

  try {
    // 1. Authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Validate tool ID
    const toolType = toolIdToType[toolId];
    if (!toolType) {
      return NextResponse.json(
        { success: false, error: `Invalid tool: ${toolId}` },
        { status: 400 }
      );
    }

    // 3. Parse request body
    const body = await req.json();

    // 4. Extract and validate AI provider/model
    const provider = (body.provider || "openai") as AIProvider;
    const model = (body.model || "gpt-4o-mini") as AIModel;

    if (!isValidProviderModel(provider, model)) {
      return NextResponse.json(
        { success: false, error: "Invalid provider/model combination" },
        { status: 400 }
      );
    }

    // 5. Get brand profile
    const [brandProfile] = await db
      .select()
      .from(brandProfiles)
      .where(eq(brandProfiles.userId, session.user.id))
      .limit(1);

    if (!brandProfile) {
      return NextResponse.json(
        {
          success: false,
          error: "Please complete your brand profile first",
        },
        { status: 400 }
      );
    }

    // 6. Route to appropriate handler
    let result: any;

    console.log("responsive body is:",body)

    switch (toolType) {
      case "headline":
        result = await handleHeadlineGeneration(
          body,
          provider,
          model,
          brandProfile,
          session.user.id,
          startTime
        );
        break;

      case "description":
        result = await handleDescriptionGeneration(
          body,
          provider,
          model,
          brandProfile,
          session.user.id,
          startTime
        );
        break;

      case "benefit-bullets":
        result = await handleBenefitBulletsGeneration(
          body,
          provider,
          model,
          brandProfile,
          session.user.id,
          startTime
        );
        break;

      case "ad-copy":
        result = await handleAdCopyGeneration(
          body,
          provider,
          model,
          brandProfile,
          session.user.id,
          startTime
        );
        break;

      case "email-subject-line":
        result = await handleEmailSubjectLineGeneration(
          body,
          provider,
          model,
          brandProfile,
          session.user.id,
          startTime
        );
        break;

      default:
        return NextResponse.json(
          { success: false, error: "Tool not implemented" },
          { status: 500 }
        );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error(`[${toolId}] Generation error:`, error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || `Failed to generate ${toolId}`,
      },
      { status: 500 }
    );
  }
}

// ========================================
// Handler: Headline Generator
// ========================================

async function handleHeadlineGeneration(
  body: any,
  provider: AIProvider,
  model: AIModel,
  brandProfile: any,
  userId: string,
  startTime: number
): Promise<GenerationResponse<HeadlineGeneratorOutput>> {
  if (!isHeadlineInput(body)) {
    throw new Error("Missing required fields for headline generation");
  }

  const inputs: HeadlineGeneratorInput = {
    productName: body.productName,
    primaryTarget: body.primaryTarget,
    mainBenefit: body.mainBenefit,
    secondaryBenefit: body.secondaryBenefit,
    dreamOutcome: body.dreamOutcome,
    howBetter: body.howBetter,
  };

  // Create generation request record
  const [requestRecord] = await db
    .insert(generationRequests)
    .values({
      userId,
      brandProfileId: brandProfile.id,
      toolType: "headline",
      inputs,
      status: "processing",
      productName: inputs.productName,
    })
    .returning();

  try {
    const prompts = createHeadlinePrompt(inputs, brandProfile);

    const aiResponse = await generateWithAI({
      provider,
      model,
      messages: [
        { role: "system", content: prompts.system },
        { role: "user", content: prompts.user },
      ],
      temperature: 0.8,
      maxTokens: 2000,
    });

    const outputs: HeadlineGeneratorOutput = parseAIResponse(
      aiResponse.content
    );

    const [updatedRequest] = await db
      .update(generationRequests)
      .set({
        outputs,
        status: "completed",
        tokensUsed: aiResponse.tokensUsed.total,
        costCents: aiResponse.costCents,
        processingTimeMs: Date.now() - startTime,
      })
      .where(eq(generationRequests.id, requestRecord.id))
      .returning();

    return {
      success: true,
      request: updatedRequest,
      outputs,
    };
  } catch (error: any) {
    await db
      .update(generationRequests)
      .set({
        status: "failed",
        errorMessage: error.message,
        processingTimeMs: Date.now() - startTime,
      })
      .where(eq(generationRequests.id, requestRecord.id));

    throw error;
  }
}

// ========================================
// Handler: Description Generator
// ========================================

async function handleDescriptionGeneration(
  body: any,
  provider: AIProvider,
  model: AIModel,
  brandProfile: any,
  userId: string,
  startTime: number
): Promise<GenerationResponse<DescriptionGeneratorOutput>> {
  console.log("desc-response", isDescriptionInput(body));
  if (!isDescriptionInput(body)) {
    throw new Error("Missing required fields for description generation");
  }

  const inputs: DescriptionGeneratorInput = {
    productName: body.productName,
    features: body.features,
    primaryTarget: body.primaryTarget,
    mainBenefit: body.mainBenefit,
    dreamOutcome: body.dreamOutcome,
    tone: body.tone,
    wordCount: body.wordCount,
  };

  const [requestRecord] = await db
    .insert(generationRequests)
    .values({
      userId,
      brandProfileId: brandProfile.id,
      toolType: "description",
      inputs,
      status: "processing",
      productName: inputs.productName,
    })
    .returning();

  try {
    const prompts = createDescriptionPrompt(inputs, brandProfile);

    const aiResponse = await generateWithAI({
      provider,
      model,
      messages: [
        { role: "system", content: prompts.system },
        { role: "user", content: prompts.user },
      ],
      temperature: 0.7,
      maxTokens: 3000,
    });

    const outputs: DescriptionGeneratorOutput = parseAIResponse(
      aiResponse.content
    );

    const [updatedRequest] = await db
      .update(generationRequests)
      .set({
        outputs,
        status: "completed",
        tokensUsed: aiResponse.tokensUsed.total,
        costCents: aiResponse.costCents,
        processingTimeMs: Date.now() - startTime,
      })
      .where(eq(generationRequests.id, requestRecord.id))
      .returning();

    return {
      success: true,
      request: updatedRequest,
      outputs,
    };
  } catch (error: any) {
    await db
      .update(generationRequests)
      .set({
        status: "failed",
        errorMessage: error.message,
        processingTimeMs: Date.now() - startTime,
      })
      .where(eq(generationRequests.id, requestRecord.id));

    throw error;
  }
}

// ========================================
// Handler: Benefit Bullets
// ========================================

async function handleBenefitBulletsGeneration(
  body: any,
  provider: AIProvider,
  model: AIModel,
  brandProfile: any,
  userId: string,
  startTime: number
): Promise<GenerationResponse<BenefitBulletsOutput>> {
  if (!isBenefitBulletsInput(body)) {
    throw new Error("Missing required fields for benefit bullets generation");
  }

  const inputs: BenefitBulletsInput = {
    features: body.features,
    productContext: body.productContext,
    targetAudience: body.targetAudience,
  };

  const [requestRecord] = await db
    .insert(generationRequests)
    .values({
      userId,
      brandProfileId: brandProfile.id,
      toolType: "bullets",
      inputs,
      status: "processing",
      productName: inputs.productContext || "Product",
    })
    .returning();

  try {
    const prompts = createBenefitBulletsPrompt(inputs, brandProfile);

    const aiResponse = await generateWithAI({
      provider,
      model,
      messages: [
        { role: "system", content: prompts.system },
        { role: "user", content: prompts.user },
      ],
      temperature: 0.7,
      maxTokens: 2000,
    });

    const outputs: BenefitBulletsOutput = parseAIResponse(aiResponse.content);

    const [updatedRequest] = await db
      .update(generationRequests)
      .set({
        outputs,
        status: "completed",
        tokensUsed: aiResponse.tokensUsed.total,
        costCents: aiResponse.costCents,
        processingTimeMs: Date.now() - startTime,
      })
      .where(eq(generationRequests.id, requestRecord.id))
      .returning();

    return {
      success: true,
      request: updatedRequest,
      outputs,
    };
  } catch (error: any) {
    await db
      .update(generationRequests)
      .set({
        status: "failed",
        errorMessage: error.message,
        processingTimeMs: Date.now() - startTime,
      })
      .where(eq(generationRequests.id, requestRecord.id));

    throw error;
  }
}

// ========================================
// Handler: Ad Copy Generator
// ========================================

async function handleAdCopyGeneration(
  body: any,
  provider: AIProvider,
  model: AIModel,
  brandProfile: any,
  userId: string,
  startTime: number
): Promise<GenerationResponse<AdCopyGeneratorOutput>> {
  if (!isAdCopyInput(body)) {
    throw new Error("Missing required fields for ad copy generation");
  }

  const inputs: AdCopyGeneratorInput = {
    productName: body.productName,
    avatarPain: body.avatarPain,
    dreamOutcome: body.dreamOutcome,
    adObjective: body.adObjective,
    targetAudience: body.targetAudience,
    adFormat: body.adFormat,
    promotionType: body.promotionType,
    promotionValue: body.promotionValue,
    duration: body.duration,
  };

  const [requestRecord] = await db
    .insert(generationRequests)
    .values({
      userId,
      brandProfileId: brandProfile.id,
      toolType: "ad_copy",
      inputs,
      status: "processing",
      productName: inputs.productName,
    })
    .returning();

  try {
    const prompts = createAdCopyPrompt(inputs, brandProfile);

    const aiResponse = await generateWithAI({
      provider,
      model,
      messages: [
        { role: "system", content: prompts.system },
        { role: "user", content: prompts.user },
      ],
      temperature: 0.8,
      maxTokens: 2500,
    });

    const outputs: AdCopyGeneratorOutput = parseAIResponse(aiResponse.content);

    const [updatedRequest] = await db
      .update(generationRequests)
      .set({
        outputs,
        status: "completed",
        tokensUsed: aiResponse.tokensUsed.total,
        costCents: aiResponse.costCents,
        processingTimeMs: Date.now() - startTime,
      })
      .where(eq(generationRequests.id, requestRecord.id))
      .returning();

    return {
      success: true,
      request: updatedRequest,
      outputs,
    };
  } catch (error: any) {
    await db
      .update(generationRequests)
      .set({
        status: "failed",
        errorMessage: error.message,
        processingTimeMs: Date.now() - startTime,
      })
      .where(eq(generationRequests.id, requestRecord.id));

    throw error;
  }
}

// ========================================
// Handler: Email Subject Line
// ========================================

async function handleEmailSubjectLineGeneration(
  body: any,
  provider: AIProvider,
  model: AIModel,
  brandProfile: any,
  userId: string,
  startTime: number
): Promise<GenerationResponse<EmailSubjectLineOutput>> {
  if (!isEmailSubjectLineInput(body)) {
    throw new Error(
      "Missing required fields for email subject line generation"
    );
  }

  const inputs: EmailSubjectLineInput = {
    emailType: body.emailType,
    offerDetails: body.offerDetails,
    timeLimit: body.timeLimit,
    personalizationFirstName: body.personalizationFirstName,
    subjectLineApproach: body.subjectLineApproach,
  };

  const [requestRecord] = await db
    .insert(generationRequests)
    .values({
      userId,
      brandProfileId: brandProfile.id,
      toolType: "email_subject",
      inputs,
      status: "processing",
      productName: brandProfile.companyName || "Email Campaign",
    })
    .returning();

  try {
    const prompts = createEmailSubjectLinePrompt(inputs, brandProfile);

    const aiResponse = await generateWithAI({
      provider,
      model,
      messages: [
        { role: "system", content: prompts.system },
        { role: "user", content: prompts.user },
      ],
      temperature: 0.9, // Higher creativity for subject lines
      maxTokens: 1500,
    });

    const outputs: EmailSubjectLineOutput = parseAIResponse(aiResponse.content);

    const [updatedRequest] = await db
      .update(generationRequests)
      .set({
        outputs,
        status: "completed",
        tokensUsed: aiResponse.tokensUsed.total,
        costCents: aiResponse.costCents,
        processingTimeMs: Date.now() - startTime,
      })
      .where(eq(generationRequests.id, requestRecord.id))
      .returning();

    return {
      success: true,
      request: updatedRequest,
      outputs,
    };
  } catch (error: any) {
    await db
      .update(generationRequests)
      .set({
        status: "failed",
        errorMessage: error.message,
        processingTimeMs: Date.now() - startTime,
      })
      .where(eq(generationRequests.id, requestRecord.id));

    throw error;
  }
}
