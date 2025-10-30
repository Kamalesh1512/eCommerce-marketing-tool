//src/types/genAI
// ========================================
// Types & Interfaces
// ========================================
export type AIProvider = "openai" | "anthropic" | "gemini" ;

// OpenAI models
export type OpenAIModel =
  | "gpt-4o"
  | "gpt-4o-mini"
  | "gpt-4-turbo"
  | "gpt-3.5-turbo";

// Anthropic models
export type AnthropicModel =
  | "claude-3-5-sonnet-20241022"
  | "claude-3-5-haiku-20241022"
  | "claude-3-opus-20240229";

// Gemini models
export type GeminiModel =
  | "gemini-1.5-pro-latest"
  | "gemini-2.5-flash-lite"
  | "gemini-2.5-flash"
  | "gemini-1.5-pro";

// OpenRouter models (can reuse any of the above)
export type OpenRouterModel = OpenAIModel | AnthropicModel | GeminiModel;

// Unified model type
export type AIModel =
  | OpenAIModel
  | AnthropicModel
  | GeminiModel
  | OpenRouterModel;

// Optional badge field for UI purposes
export interface ModelOption {
  value: AIModel;
  label: string;
  badge?: string;
}

export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIGenerationOptions {
  provider: AIProvider;
  model: AIModel;
  messages: AIMessage[];
  temperature?: number;
  maxTokens?: number;
  apiKey?: string; // User's BYOK
}

export interface AIGenerationResponse {
  content: string;
  tokensUsed: {
    prompt: number;
    completion: number;
    total: number;
  };
  model: string;
  provider: AIProvider;
  costCents: number;
}
