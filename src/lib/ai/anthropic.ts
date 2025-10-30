// src/lib/ai/providers/anthropic.ts
import Anthropic from "@anthropic-ai/sdk";
import { AIGenerationOptions, AIGenerationResponse } from "./types";
import { calculateCost } from "./pricing";


export async function generateWithAnthropic(
  options: AIGenerationOptions
): Promise<AIGenerationResponse> {
  const apiKey = options.apiKey || process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("Anthropic API key not configured");

  const anthropic = new Anthropic({ apiKey });

  const systemMessage = options.messages.find(m => m.role === "system");
  const userMessages = options.messages.filter(m => m.role !== "system");

  const message = await anthropic.messages.create({
    model: options.model,
    max_tokens: options.maxTokens ?? 2000,
    temperature: options.temperature ?? 0.7,
    system: systemMessage?.content || "",
    messages: userMessages.map(msg => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.content,
    })),
  });

  // ✅ Filter only text blocks
  const textBlocks = message.content
    .filter(block => block.type === "text")
    .map(block => (block as any).text)
    .join("\n\n");

  const promptTokens = message.usage.input_tokens;
  const completionTokens = message.usage.output_tokens;

  return {
    content: textBlocks,
    tokensUsed: {
      prompt: promptTokens,
      completion: completionTokens,
      total: promptTokens + completionTokens,
    },
    model: message.model,
    provider: "anthropic",
    costCents: calculateCost("anthropic", options.model, promptTokens, completionTokens),
  };
}
