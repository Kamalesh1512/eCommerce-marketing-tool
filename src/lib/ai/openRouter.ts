import { AIGenerationOptions, AIGenerationResponse } from "./types";

export async function generateWithOpenRouter(
  options: AIGenerationOptions
): Promise<AIGenerationResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OpenRouter API key not configured");

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      "X-Title": "MarketAI Content Generator",
    },
    body: JSON.stringify({
      model: options.model,
      messages: options.messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 2000,
    }),
  });

  const data = await res.json();
  const choice = data.choices[0];

  return {
    content: choice.message?.content ?? "",
    tokensUsed: {
      prompt: data.usage?.prompt_tokens ?? 0,
      completion: data.usage?.completion_tokens ?? 0,
      total: data.usage?.total_tokens ?? 0,
    },
    model: data.model,
    provider: "openai",
    costCents: 0,
  };
}
