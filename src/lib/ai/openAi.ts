import OpenAI from "openai";
import { AIGenerationOptions, AIGenerationResponse } from "./types";
import { calculateCost } from "./pricing";

export async function generateWithOpenAI(
  options: AIGenerationOptions
): Promise<AIGenerationResponse> {
  const apiKey = options.apiKey || process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OpenAI API key not configured");

  const openai = new OpenAI({ apiKey });
  const completion = await openai.chat.completions.create({
    model: options.model,
    messages: options.messages,
    temperature: options.temperature ?? 0.7,
    max_tokens: options.maxTokens ?? 2000,
  });

  const choice = completion.choices[0];
  const promptTokens = completion.usage?.prompt_tokens || 0;
  const completionTokens = completion.usage?.completion_tokens || 0;

  return {
    content: choice.message?.content ?? "",
    tokensUsed: {
      prompt: promptTokens,
      completion: completionTokens,
      total: promptTokens + completionTokens,
    },
    model: completion.model,
    provider: "openai",
    costCents: calculateCost("openai", options.model, promptTokens, completionTokens),
  };
}
