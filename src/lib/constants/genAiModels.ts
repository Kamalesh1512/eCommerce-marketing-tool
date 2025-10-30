//src/lib/constants/headline-generator.ts
import { AIProvider, ModelOption } from "../ai/types";

export const modelOptions: Record<AIProvider, ModelOption[]> = {
  openai: [
    { value: "gpt-4o", label: "GPT-4o (Best Quality)", badge: "Recommended" },
    {
      value: "gpt-4o-mini",
      label: "GPT-4o Mini (Fast & Cheap)",
      badge: "Popular",
    },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo (Fastest)" },
  ],
  anthropic: [
    {
      value: "claude-3-5-sonnet-20241022",
      label: "Claude 3.5 Sonnet",
      badge: "Best",
    },
    { value: "claude-3-5-haiku-20241022", label: "Claude 3.5 Haiku (Fast)" },
    { value: "claude-3-opus-20240229", label: "Claude 3 Opus" },
  ],
  gemini: [
    { value: "gemini-2.5-flash-lite", label: "Gemini 2.5 Flash Lite (Best)" },
    { value: "gemini-2.5-flash", label: "Gemini 2.5 Flash (Fastest)" },
    // { value: "gemini-1.0", label: "Gemini 1.0 Pro" },
  ],
  // openrouter: [
  //   { value: "gpt-4o", label: "GPT-4o via OpenRouter" },
  //   { value: "claude-3-5-sonnet-20241022", label: "Claude 3.5 via OpenRouter" },
  //   { value: "gemini-1.5-pro-latest", label: "Gemini 1.5 via OpenRouter" },
  // ],
};
