"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface AiTool {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  features: string[];
  badge: string;
  color: string;
}

interface DashboardAiToolsGridProps {
  features: AiTool[];
}

export function DashboardAiToolsGrid({ features }: DashboardAiToolsGridProps) {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="w-6 h-6 text-yellow-500">✨</span> AI-Powered Content Tools
          </h2>
          <p className="text-muted-foreground mt-1">
            Choose a tool to start generating high-converting content
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card
              key={feature.title}
              className="group cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02] border-border/50 overflow-hidden relative"
              onClick={() => router.push(feature.href)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`}
              />

              <CardHeader className="relative">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {/* <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge> */}
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {feature.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="relative">
                <div className="space-y-2 mb-4">
                  {feature.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feat}
                    </div>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                >
                  Start Creating →
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
