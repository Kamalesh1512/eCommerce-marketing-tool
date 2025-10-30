// src/components/tools/shares/resultsDisplay
"use client";

import { useState, ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Loader2, Copy, Check, Download, TrendingUp, Sparkles } from "lucide-react";

interface ResultsDisplayProps {
  loading: boolean;
  error: string;
  tokensUsed: number;
  costCents: number;
  selectedModel: string;
  onExport: () => void;
  emptyStateIcon?: ReactNode;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  children?: ReactNode; // Actual results content
}

export function ResultsDisplay({
  loading,
  error,
  tokensUsed,
  costCents,
  selectedModel,
  onExport,
  emptyStateIcon,
  emptyStateTitle = "No results yet",
  emptyStateDescription = "Fill in the form and generate content to see results here",
  children,
}: ResultsDisplayProps) {
  const hasResults = !!children;

  return (
    <Card className="border-2 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Generated Results</CardTitle>
            <CardDescription>AI-powered content generation</CardDescription>
          </div>
          {hasResults && (
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Error State */}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Empty State */}
        {!hasResults && !loading && (
          <div className="text-center py-16 text-muted-foreground">
            {emptyStateIcon || <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-30" />}
            <p className="text-lg font-medium">{emptyStateTitle}</p>
            <p className="text-sm mt-2">{emptyStateDescription}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin text-primary" />
            <p className="text-lg font-medium">Generating content...</p>
            <p className="text-sm text-muted-foreground mt-2">This may take 10-30 seconds depending on the model</p>
          </div>
        )}

        {/* Results */}
        {hasResults && (
          <div className="space-y-4">
            {/* Usage Stats
            <UsageStats 
              tokensUsed={tokensUsed} 
              costCents={costCents} 
              selectedModel={selectedModel} 
            /> */}

            {/* Actual Content */}
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ========================================
// Usage Stats Component
// ========================================
interface UsageStatsProps {
  tokensUsed: number;
  costCents: number;
  selectedModel: string;
}

function UsageStats({ tokensUsed, costCents, selectedModel }: UsageStatsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 p-3 bg-muted/50 rounded-lg text-sm">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-muted-foreground" />
        <span className="text-muted-foreground">Tokens:</span>
        <span className="font-medium">{tokensUsed.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Cost:</span>
        <span className="font-medium">${(costCents / 100).toFixed(4)}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Model:</span>
        <Badge variant="outline" className="font-mono text-xs">
          {selectedModel.split(":")[1]}
        </Badge>
      </div>
    </div>
  );
}

// ========================================
// Copy Button Component
// ========================================
interface CopyButtonProps {
  text: string;
  onCopy?: () => void;
}

export function CopyButton({ text, onCopy }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    if (onCopy) onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleCopy}>
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-600" />
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
        </>
      )}
    </Button>
  );
}

// ========================================
// Result Card Component (for individual results)
// ========================================
interface ResultCardProps {
  title?: string;
  content: string;
  metadata?: Array<{ label: string; value: string | number }>;
  badges?: Array<{ label: string; variant?: "default" | "secondary" | "outline" }>;
  isTopPick?: boolean;
  children?: ReactNode;
}

export function ResultCard({ 
  title, 
  content, 
  metadata, 
  badges, 
  isTopPick,
  children 
}: ResultCardProps) {
  return (
    <div className={`p-4 rounded-lg border ${isTopPick ? "border-2 border-primary bg-primary/5" : "border-border"} hover:shadow-md transition-shadow`}>
      {isTopPick && (
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          <span className="font-semibold text-sm uppercase tracking-wide">Top Pick</span>
        </div>
      )}
      
      {title && <h3 className="font-semibold mb-2">{title}</h3>}
      
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="flex-1 whitespace-pre-wrap">{content}</p>
        <CopyButton text={content} />
      </div>

      {badges && badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {badges.map((badge, idx) => (
            <Badge key={idx} variant={badge.variant || "secondary"} className="text-xs">
              {badge.label}
            </Badge>
          ))}
        </div>
      )}

      {metadata && metadata.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
          {metadata.map((item, idx) => (
            <span key={idx}>
              {item.label}: <span className="font-medium">{item.value}</span>
            </span>
          ))}
        </div>
      )}

      {children}
    </div>
  );
}