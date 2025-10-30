// app/(protected)/tools/[toolId]/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import type { AIProvider, AIModel } from "@/lib/ai/types";
import { getToolConfig } from "@/lib/tools/configs";
import { UniversalToolForm } from "@/components/tools/shared/universalToolForm";
import { ResultsDisplay } from "@/components/tools/shared/resultsDisplay";
import { ProTipsCard } from "@/components/tools/shared/proTipsCard";

export default function UniversalToolPage() {
  const params = useParams();
  const toolId = params.toolId as string;

  // Get tool configuration
  const config = getToolConfig(toolId);

  if (!config) {
    return (
      <div className="container mx-auto p-8 max-w-7xl">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-destructive">
            Tool Not Found
          </h1>
          <p className="text-muted-foreground mt-2">
            The tool "{toolId}" doesn't exist or hasn't been configured yet.
          </p>
        </div>
      </div>
    );
  }

  const Icon = config.icon;

  // State management
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedModel, setSelectedModel] =
    useState<string>("gemini:gemini-2.5-flash");
  const [results, setResults] = useState<any>(null);
  const [tokensUsed, setTokensUsed] = useState<number>(0);
  const [costCents, setCostCents] = useState<number>(0);

  const handleSubmit = async (inputs: Record<string, any>) => {
    setLoading(true);
    setError("");

    const [provider, model] = selectedModel.split(":") as [AIProvider, AIModel];

    try {
      const response = await fetch(`/api/generate/${config.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...inputs,
          provider,
          model,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || `Failed to generate ${config.name.toLowerCase()}`
        );
      }

      setResults(data.outputs);
      setTokensUsed(data.request.tokensUsed || 0);
      setCostCents(data.request.costCents || 0);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const exportResults = () => {
    if (!results) return;
    const [provider, model] = selectedModel.split(":");
    const exportData = {
      tool: config.id,
      generatedAt: new Date().toISOString(),
      results,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${config.id}-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl pb-20 md:pb-8">
      {/* Header */}
      <div className="mb-8 relative">
        <div
          className={`absolute inset-0 bg-gradient-to-r from-${config.gradient.from}/10 via-${config.gradient.via}/10 to-${config.gradient.to}/10 blur-3xl -z-10`}
        />
        <div className="flex items-start justify-between">
          <div>
            <h1
              className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-${config.gradient.from} via-${config.gradient.via} to-${config.gradient.to} bg-clip-text text-transparent flex items-center gap-3`}
            >
              <Icon className="w-10 h-10 text-primary" />
              {config.name}
            </h1>
            <p className="text-muted-foreground mt-3 text-lg max-w-2xl">
              {config.description}
            </p>
          </div>
        </div>
      </div>

      {/* Form and ProTips side by side */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Tool Form */}
        <div className="lg:col-span-2">
          <Card className="border-2 shadow-lg">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Product Details
              </CardTitle>
              <CardDescription>
                Tell us about your product. Use the brand profile suggestions
                for faster setup.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <UniversalToolForm
                config={config}
                onSubmit={handleSubmit}
                loading={loading}
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
              />
            </CardContent>
          </Card>
        </div>

        {/* Pro Tips */}
        <div className="lg:col-span-1">
          <ProTipsCard tips={config.proTips} />
        </div>
      </div>

      {/* Results Section */}
      <ResultsDisplay
        loading={loading}
        error={error}
        tokensUsed={tokensUsed}
        costCents={costCents}
        selectedModel={selectedModel}
        onExport={exportResults}
        emptyStateIcon={
          config.resultConfig.emptyStateIcon && (
            <config.resultConfig.emptyStateIcon />
          )
        }
        emptyStateTitle={config.resultConfig.emptyStateTitle}
        emptyStateDescription={config.resultConfig.emptyStateDescription}
      >
        {results && config.resultConfig.renderResults(results)}
      </ResultsDisplay>
    </div>
  );
}
