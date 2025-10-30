// src/app/(protected)/dashboard/page.tsx
"use client";

import { useSession } from "next-auth/react";

import { getDashboardTools, recentActivity, stats } from "@/lib/constants/dashboard";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardStatsGrid } from "@/components/dashboard/dashboard-statsgrid";
import { DashboardAiToolsGrid } from "@/components/dashboard/dashboard-aitoolsgrid";
import { DashboardQuickTips } from "@/components/dashboard/dashboard-quicktips";
import { DashboardRecentActivity } from "@/components/dashboard/dashboard-recentactivity";
import { DashboardGettingStartedGuide } from "@/components/dashboard/dashboard-gettingstarted";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  
  // Get tools dynamically from configs
  const aiTools = getDashboardTools();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 pb-20 md:pb-8">
      <DashboardHeader username={session?.user?.name!} />
      {/* <DashboardStatsGrid stats={stats} /> */}
      <DashboardAiToolsGrid features={aiTools} />
      <DashboardQuickTips />
      {/* <DashboardRecentActivity activities={recentActivity} /> */}
      <DashboardGettingStartedGuide />
    </div>
  );
}