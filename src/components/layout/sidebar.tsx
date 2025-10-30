//src/components/layout/sidebar.tsx
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Session } from "next-auth";
import {
  LayoutDashboard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ChevronDown,
  Target,
  FileText,
  Zap,
  Facebook,
  Mail,
  FolderOpen,
  History,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { mainNavigation, toolsNavigation } from "@/lib/constants/sidebar";

interface SidebarProps {
  user: Session["user"];
}

export function Sidebar({ user }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(true);
  const pathname = usePathname();

  const isToolActive = toolsNavigation.some((tool) => pathname === tool.href);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col bg-card border-r border-border transition-all duration-300",
          collapsed ? "w-16" : "w-72"
        )}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!collapsed && (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-bold text-xl"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                eCommTool
              </span>
            </Link>
          )}
          {collapsed && (
            <Link href="/dashboard">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto cursor-pointer hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </Link>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <TooltipProvider delayDuration={0}>
            {/* Main Navigation */}
            {mainNavigation.slice(0, 1).map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <Link href={item.href}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start",
                          collapsed && "justify-center px-2"
                        )}
                      >
                        <Icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                        {!collapsed && <span>{item.name}</span>}
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>{item.name}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}

            {/* Tools Section with Accordion */}
            {!collapsed ? (
              <Collapsible open={toolsOpen} onOpenChange={setToolsOpen}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant={isToolActive ? "secondary" : "ghost"}
                    className="w-full justify-between"
                  >
                    <div className="flex items-center">
                      <Sparkles className="h-5 w-5 mr-3" />
                      <span>AI Tools</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        toolsOpen && "transform rotate-180"
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 mt-1">
                  {toolsNavigation.map((tool) => {
                    const isActive = pathname === tool.href;
                    const Icon = tool.icon;

                    return (
                      <Link key={tool.name} href={tool.href}>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className="w-full justify-start pl-10 h-auto py-2"
                          size="sm"
                        >
                          <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
                          <div className="flex flex-col items-start text-left">
                            <span className="text-sm font-medium">
                              {tool.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {tool.description}
                            </span>
                          </div>
                        </Button>
                      </Link>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              // Collapsed view for tools
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isToolActive ? "secondary" : "ghost"}
                    className="w-full justify-center px-2"
                    onClick={() => setCollapsed(false)}
                  >
                    <Sparkles className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="w-48">
                  <div className="space-y-2">
                    <p className="font-semibold">AI Tools</p>
                    {toolsNavigation.map((tool) => (
                      <Link key={tool.name} href={tool.href}>
                        <div className="text-sm hover:text-muted-foreground cursor-pointer py-1">
                          {tool.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            )}

            {/* Rest of Main Navigation */}
            {mainNavigation.slice(1).map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <Link href={item.href}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start",
                          collapsed && "justify-center px-2"
                        )}
                      >
                        <Icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                        {!collapsed && <span>{item.name}</span>}
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>{item.name}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </nav>

        {/* User Info & Toggle */}
        <div className="border-t border-border">
          <div className="p-4">
            <Button
              variant="ghost"
              size={collapsed ? "icon" : "default"}
              onClick={() => setCollapsed(!collapsed)}
              className="w-full"
            >
              {collapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <>
                  <ChevronLeft className="h-5 w-5 mr-2" />
                  <span className="text-sm">Collapse</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-inset-bottom">
        <div className="grid grid-cols-5 gap-1 p-2">
          {/* Dashboard */}
          <Link href="/dashboard">
            <Button
              variant={pathname === "/dashboard" ? "secondary" : "ghost"}
              size="sm"
              className="flex flex-col h-16 w-full gap-1"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </Button>
          </Link>

          {/* Tools (opens to first tool) */}
          <Link href="/tools/headline-generator">
            <Button
              variant={isToolActive ? "secondary" : "ghost"}
              size="sm"
              className="flex flex-col h-16 w-full gap-1"
            >
              <Sparkles className="h-5 w-5" />
              <span className="text-xs">Tools</span>
            </Button>
          </Link>

          {/* History */}
          <Link href="/history">
            <Button
              variant={pathname === "/history" ? "secondary" : "ghost"}
              size="sm"
              className="flex flex-col h-16 w-full gap-1"
            >
              <History className="h-5 w-5" />
              <span className="text-xs">History</span>
            </Button>
          </Link>

          {/* Analytics */}
          <Link href="/analytics">
            <Button
              variant={pathname === "/analytics" ? "secondary" : "ghost"}
              size="sm"
              className="flex flex-col h-16 w-full gap-1"
            >
              <BarChart3 className="h-5 w-5" />
              <span className="text-xs">Analytics</span>
            </Button>
          </Link>

          {/* Settings */}
          <Link href="/settings">
            <Button
              variant={pathname === "/settings" ? "secondary" : "ghost"}
              size="sm"
              className="flex flex-col h-16 w-full gap-1"
            >
              <Settings className="h-5 w-5" />
              <span className="text-xs">Settings</span>
            </Button>
          </Link>
        </div>
      </nav>
    </>
  );
}
