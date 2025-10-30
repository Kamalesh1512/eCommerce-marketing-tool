import type { AIProvider, AIModel } from "./types";

export const PRICING = {
  openai: {
    "gpt-4o": { input: 2.5, output: 10 },
    "gpt-4o-mini": { input: 0.15, output: 0.6 },
    "gpt-4-turbo": { input: 10, output: 30 },
    "gpt-3.5-turbo": { input: 0.5, output: 1.5 },
  },
  anthropic: {
    "claude-3-5-sonnet-20241022": { input: 3, output: 15 },
    "claude-3-5-haiku-20241022": { input: 1, output: 5 },
    "claude-3-opus-20240229": { input: 15, output: 75 },
  },
  gemini: {
    "gemini-1.5-pro": { input: 1.25, output: 5 },
    "gemini-1.5-flash": { input: 0.075, output: 0.3 },
  },
};

export function calculateCost(
  provider: AIProvider,
  model: AIModel,
  promptTokens: number,
  completionTokens: number
): number {
  const pricing = (PRICING as any)[provider]?.[model];
  if (!pricing) return 0;

  const inputCost = (promptTokens / 1_000_000) * pricing.input;
  const outputCost = (completionTokens / 1_000_000) * pricing.output;

  return Math.ceil((inputCost + outputCost) * 100);
}
