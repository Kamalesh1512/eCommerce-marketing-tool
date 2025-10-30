"use client";

import { useRouter } from "next/navigation";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  username?: string;
}

export function DashboardHeader({ username }: DashboardHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Welcome back, {username || "User"}!
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Transform your product copy with AI-powered marketing tools
        </p>
      </div>
      <Button
        onClick={() => router.push("/settings")}
        variant="outline"
        className="hidden md:flex items-center gap-2"
      >
        <MessageSquare className="w-4 h-4" />
        Edit Brand Profile
      </Button>
    </div>
  );
}
