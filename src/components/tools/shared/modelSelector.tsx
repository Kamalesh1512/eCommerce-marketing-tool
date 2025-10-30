// components/tools/shared/ModelSelector.tsx
"use client";

import Image from "next/image";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";
import { modelOptions } from "@/lib/constants/genAiModels";

// Model logos/icons mapping (public/icons/*.png)
const modelLogos: Record<string, string> = {
  "gpt-4o": "/icons/chat-gpt.png",
  "gpt-4o-mini": "/icons/chat-gpt.png",
  "gpt-4-turbo": "/icons/chat-gpt.png",
  "gpt-3.5-turbo": "/icons/chat-gpt.png",
  "claude-3-5-sonnet-20241022": "/icons/claude-ai.png",
  "claude-3-5-haiku-20241022": "/icons/claude-ai.png",
  "claude-3-opus-20240229": "/icons/claude-ai.png",
  "gemini-2.5-flash-lite": "/icons/gemini-ai.png",
  "gemini-2.5-flash": "/icons/gemini-ai.png",
};

interface ModelSelectorProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

export function ModelSelector({
  selectedModel,
  setSelectedModel,
}: ModelSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label>AI Model</Label>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Info className="w-4 h-4 text-muted-foreground hover:text-primary cursor-help transition-colors" />
          </HoverCardTrigger>
          <HoverCardContent className="w-80" align="start">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">AI Model Selection</h4>
              <p className="text-sm text-muted-foreground">
                Choose the AI model that best fits your needs. Different models
                have different capabilities and costs.
              </p>
              <div className="pt-2 border-t space-y-1">
                <p className="text-xs">
                  <strong>OpenAI:</strong> General-purpose, reliable
                </p>
                <p className="text-xs">
                  <strong>Claude:</strong> Excellent for creative writing
                </p>
                <p className="text-xs">
                  <strong>Gemini:</strong> Fast and cost-effective
                </p>
                {/* <p className="text-xs">
                  <strong>🔀 OpenRouter:</strong> Access to multiple providers
                </p> */}
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      <Select value={selectedModel} onValueChange={setSelectedModel}>
        <SelectTrigger className="h-11">
          <SelectValue placeholder="Select an AI model" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(modelOptions).map(([provider, models]) => (
            <div key={provider}>
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase">
                {provider === "openai" && "🤖 OpenAI"}
                {provider === "anthropic" && "🧠 Anthropic"}
                {provider === "gemini" && "💎 Google Gemini"}
                {/* {provider === "openrouter" && "🔀 OpenRouter"} */}
              </div>

              {models.map((m) => (
                <SelectItem
                  key={`${provider}:${m.value}`}
                  value={`${provider}:${m.value}`}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={modelLogos[m.value] || "/icons/default-ai.png"}
                      alt={m.label}
                      width={18}
                      height={18}
                      className="rounded-sm"
                    />
                    <span>{m.label}</span>
                    {m.badge && (
                      <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                        {m.badge}
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </div>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
