// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { AIGenerationOptions, AIGenerationResponse } from "./types";
// import { calculateCost } from "./pricing";

// export async function generateWithGemini(
//   options: AIGenerationOptions
// ): Promise<AIGenerationResponse> {
//   const apiKey = options.apiKey || process.env.GEMINI_API_KEY;
//   if (!apiKey) throw new Error("Gemini API key not configured");

//   const genAI = new GoogleGenerativeAI(apiKey);
//   const model = genAI.getGenerativeModel({ model: options.model });

//   // const prompt = options.messages
//   //   .map((m) => `${m.role}: ${m.content}`)
//   //   .join("\n");

//   const prompt = options.messages.map((m) => m.content).join("\n");

//   // console.log(prompt);
//   const result = await model.generateContent({
//     contents: [{ role: "user", parts: [{ text: prompt }] }],
//     generationConfig: {
//       temperature: options.temperature ?? 0.7,
//       maxOutputTokens: options.maxTokens ?? 2000,
//     },
//   });

//   // const text = result.response.text() || "";

//   const response = result.response;

//   // Try .text() first
//   let text = "";
//   if (typeof response.text === "function") {
//     text = response.text() || "";
//   }

//   // Fallback: extract from candidates array
//   if (
//     !text &&
//     Array.isArray(response.candidates) &&
//     response.candidates.length > 0
//   ) {
//     const parts = response.candidates[0]?.content?.parts;
//     if (Array.isArray(parts)) {
//       text = parts
//         .map((p: any) => p.text || "")
//         .join("\n")
//         .trim();
//     }
//   }

//   console.log("✅ Extracted Text:", text);

//   // Note: Gemini SDK currently doesn’t return token counts reliably.
//   const promptTokens = 0;
//   const completionTokens = 0;

//   return {
//     content: text,
//     tokensUsed: {
//       prompt: promptTokens,
//       completion: completionTokens,
//       total: 0,
//     },
//     model: options.model,
//     provider: "gemini",
//     costCents: calculateCost(
//       "gemini",
//       options.model,
//       promptTokens,
//       completionTokens
//     ),
//   };
// }


import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIGenerationOptions, AIGenerationResponse } from "./types";
import { calculateCost } from "./pricing";

export async function generateWithGemini(
  options: AIGenerationOptions
): Promise<AIGenerationResponse> {
  const apiKey = options.apiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Gemini API key not configured");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: options.model });

  // Combine all messages into a single prompt
  const prompt = options.messages.map((m) => m.content).join("\n");

  console.log("🔍 Sending prompt:", prompt);

  // Generate content
  const result = await model.generateContent(prompt);
  
  // Access response properly
  const response = result.response;
  
  // Extract text - the .text() method should work
  const text = response.text();
  
  console.log("✅ Generated Text:", text);

  // Token usage - Gemini API now provides usage metadata
  const usageMetadata = response.usageMetadata;
  const promptTokens = usageMetadata?.promptTokenCount || 0;
  const completionTokens = usageMetadata?.candidatesTokenCount || 0;
  const totalTokens = usageMetadata?.totalTokenCount || 0;

  console.log("📊 Token Usage:", {
    prompt: promptTokens,
    completion: completionTokens,
    total: totalTokens,
  });

  return {
    content: text,
    tokensUsed: {
      prompt: promptTokens,
      completion: completionTokens,
      total: totalTokens,
    },
    model: options.model,
    provider: "gemini",
    costCents: calculateCost(
      "gemini",
      options.model,
      promptTokens,
      completionTokens
    ),
  };
}

// Alternative implementation using the NEW @google/genai package
// If you want to use the latest SDK, install: npm install @google/genai
/*
import { GoogleGenAI } from "@google/genai";

export async function generateWithGeminiNew(
  options: AIGenerationOptions
): Promise<AIGenerationResponse> {
  const apiKey = options.apiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Gemini API key not configured");

  const ai = new GoogleGenAI({ apiKey });

  const prompt = options.messages.map((m) => m.content).join("\n");

  console.log("🔍 Sending prompt:", prompt);

  const response = await ai.models.generateContent({
    model: options.model,
    contents: prompt,
    config: {
      temperature: options.temperature ?? 0.7,
      maxOutputTokens: options.maxTokens ?? 2000,
    },
  });

  const text = response.text;

  console.log("✅ Generated Text:", text);

  // Token usage from the new SDK
  const usageMetadata = response.usageMetadata;
  const promptTokens = usageMetadata?.promptTokenCount || 0;
  const completionTokens = usageMetadata?.candidatesTokenCount || 0;
  const totalTokens = usageMetadata?.totalTokenCount || 0;

  return {
    content: text,
    tokensUsed: {
      prompt: promptTokens,
      completion: completionTokens,
      total: totalTokens,
    },
    model: options.model,
    provider: "gemini",
    costCents: calculateCost(
      "gemini",
      options.model,
      promptTokens,
      completionTokens
    ),
  };
}
*/