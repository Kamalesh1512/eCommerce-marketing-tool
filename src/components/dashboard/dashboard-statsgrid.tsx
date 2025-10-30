"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export interface Stat {
  title: string;
  value: string;
  change: string;
  trend: string;
  icon: LucideIcon;
}

interface DashboardStatsGridProps {
  stats: Stat[];
}

export function DashboardStatsGrid({ stats }: DashboardStatsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="border-border/50 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div
                className={`p-2 rounded-lg ${
                  stat.trend === "up"
                    ? "bg-green-100 dark:bg-green-900/20"
                    : "bg-muted"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    stat.trend === "up"
                      ? "text-green-600 dark:text-green-400"
                      : "text-muted-foreground"
                  }`}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
