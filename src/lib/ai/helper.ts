import { AIModel, AIProvider } from "./types";

export function getAvailableModels(provider: AIProvider): AIModel[] {
  switch (provider) {
    case "openai":
      return ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-3.5-turbo"];
    case "anthropic":
      return [
        "claude-3-5-sonnet-20241022",
        "claude-3-5-haiku-20241022",
        "claude-3-opus-20240229",
      ];
    case "gemini":
      return [
        "gemini-2.5-flash",
        "gemini-2.5-flash-lite",
      ];
    // case "openrouter":
    //   return [
    //     "gpt-4o",
    //     "claude-3-5-sonnet-20241022",
    //     "gemini-1.5-pro-latest",
    //   ];
    default:
      return [];
  }
}

// ========================================
// Helper: Validate Provider/Model
// ========================================
export function isValidProviderModel(provider: AIProvider, model: AIModel): boolean {
  const availableModels = getAvailableModels(provider);
  return availableModels.includes(model);
}
