import { AIGenerationOptions, AIGenerationResponse, AIProvider } from "./types";

import { generateWithAnthropic } from "./anthropic";

import { generateWithGemini } from "./gemini";
import { generateWithOpenRouter } from "./openRouter";
import { generateWithOpenAI } from "./openAi";

export async function generateWithAI(
  options: AIGenerationOptions
): Promise<AIGenerationResponse> {
  const start = Date.now();
  let response: AIGenerationResponse;

  switch (options.provider) {
    case "openai":
      response = await generateWithOpenAI(options);
      break;
    case "anthropic":
      response = await generateWithAnthropic(options);
      break;
    case "gemini":
      response = await generateWithGemini(options);
      break;
    // case "openrouter":
    //   response = await generateWithOpenRouter(options);
    //   break;
    default:
      throw new Error(`Unsupported provider: ${options.provider}`);
  }

  console.log(
    `✅ ${options.provider}/${options.model} completed in ${
      Date.now() - start
    }ms`
  );
  return response;
}
