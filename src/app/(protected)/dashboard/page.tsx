// src/app/(protected)/dashboard/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  BarChartIcon,
  FileTextIcon,
  PlusIcon,
  Users,
  TrendingUp,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const quickActions = [
    {
      title: "Create Campaign",
      description: "Launch a new marketing campaign",
      icon: PlusIcon,
      href: "/campaigns/create",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Generate Content",
      description: "AI-powered content creation",
      icon: FileTextIcon,
      href: "/content",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "View Analytics",
      description: "Track your performance metrics",
      icon: BarChartIcon,
      href: "/analytics",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Audience Insights",
      description: "Understand your customers",
      icon: Users,
      href: "/audience",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const stats = [
    {
      title: "Active Campaigns",
      value: "12",
      change: "+2 from last month",
      icon: TrendingUp,
    },
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+20.1% from last month",
      icon: ShoppingCart,
    },
    {
      title: "Content Generated",
      value: "89",
      change: "+12 this week",
      icon: FileTextIcon,
    },
    {
      title: "Audience Reach",
      value: "24.5K",
      change: "+8.3% from last week",
      icon: Users,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 pb-20 md:pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {session?.user?.name || "User"}!
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Quick Actions
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card
                key={action.title}
                className="group cursor-pointer transition-all hover:shadow-lg hover:scale-105"
                onClick={() => router.push(action.href)}
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="w-full group-hover:bg-primary/10"
                  >
                    Get Started →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your latest campaigns and content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileTextIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Summer Sale Campaign
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Created 2 hours ago
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <BarChartIcon className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Monthly Report Generated
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Generated 5 hours ago
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}