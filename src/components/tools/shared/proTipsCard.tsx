//src/components/tools/shared/protipsCard
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ProTip {
  icon?: LucideIcon;
  title: string;
  description: string;
}

interface ProTipsCardProps {
  tips: ProTip[];
  title?: string;
}

export function ProTipsCard({ tips, title = "💡 Pro Tips" }: ProTipsCardProps) {
  return (
    <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <div key={index} className="text-sm">
              <p className="flex items-start gap-2">
                {Icon ? (
                  <Icon className="w-4 h-4 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
                ) : (
                  <span className="text-yellow-600 dark:text-yellow-500">•</span>
                )}
                <span>
                  <strong className="font-semibold">{tip.title}:</strong>{" "}
                  <span className="text-muted-foreground">{tip.description}</span>
                </span>
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}