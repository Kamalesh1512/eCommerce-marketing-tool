"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";

export interface Activity {
  title: string;
  description: string;
  action: string;
  href: string;
  icon: any;
  iconBg: string;
  iconColor: string;
}

interface DashboardRecentActivityProps {
  activities: Activity[];
}

export function DashboardRecentActivity({ activities }: DashboardRecentActivityProps) {
  const router = useRouter();

  return (
    <Card className="border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest generations and updates</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => router.push("/history")} className="gap-2">
            <History className="w-4 h-4" />
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, idx) => {
            const Icon = activity.icon;
            return (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full ${activity.iconBg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${activity.iconColor}`} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => router.push(activity.href)}>
                  {activity.action}
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
