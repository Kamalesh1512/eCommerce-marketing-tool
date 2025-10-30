//lib/constants/dashboard

import {
  Sparkles,
  FileText,
  Mail,
  Facebook,
  Zap,
  TrendingUp,
  ShoppingCart,
  Users,
  BarChart3,
  ArrowRight,
  Target,
  MessageSquare,
  History,
  FolderOpen,
} from "lucide-react";

// MVP AI Features - Core Value
export const aiFeatures = [
  {
    title: "Headline Generator",
    description:
      "Transform boring headlines into irresistible offers that stop the scroll",
    icon: Target,
    href: "/tools/headline-generator",
    color: "from-blue-500 to-cyan-500",
    badge: "High-Converting",
    features: ["Benefit-driven", "Multiple variations", "Offer architecture"],
  },
  {
    title: "Product Description",
    description:
      "AI-powered storyteller that sells the dream, not just features",
    icon: FileText,
    href: "/tools/product-description",
    color: "from-purple-500 to-pink-500",
    badge: "Storytelling",
    features: ["Narrative structure", "Emotion-driven", "Readability score"],
  },
  {
    title: "Benefit Bullets",
    description:
      "Convert technical features into compelling benefits that drive sales",
    icon: Zap,
    href: "/tools/benefit-bullets",
    color: "from-orange-500 to-red-500",
    badge: "Value-Focused",
    features: ["Feature → Benefit", "Dream outcomes", "Customer-centric"],
  },
  {
    title: "Ad Copy Generator",
    description: "Stop-the-scroll ad copy optimized for social media feeds",
    icon: Facebook,
    href: "/tools/ad-copy-generator",
    color: "from-green-500 to-emerald-500",
    badge: "Scroll-Stopping",
    features: ["Hook formulas", "Platform-specific", "CTA optimization"],
  },
  {
    title: "Email Subject Lines",
    description: "Psychological triggers that boost open rates and engagement",
    icon: Mail,
    href: "/tools/email-subject-lines",
    color: "from-yellow-500 to-amber-500",
    badge: "High Open Rate",
    features: ["A/B testing ready", "Trigger-based", "Best practices"],
  },
  {
    title: "Batch Processing",
    description: "Upload CSV for bulk content generation across all products",
    icon: FolderOpen,
    href: "/tools/batch-processing",
    color: "from-indigo-500 to-purple-500",
    badge: "Scale Fast",
    features: ["CSV upload", "Bulk generation", "Export results"],
  },
];

export const stats = [
  {
    title: "Total Generations",
    value: "0",
    change: "Start creating content",
    icon: Sparkles,
    trend: "neutral",
  },
  {
    title: "This Month",
    value: "0",
    change: "10 remaining in free plan",
    icon: TrendingUp,
    trend: "neutral",
  },
  {
    title: "Most Used Tool",
    value: "—",
    change: "No data yet",
    icon: Target,
    trend: "neutral",
  },
  {
    title: "Success Rate",
    value: "—",
    change: "Generate to track",
    icon: BarChart3,
    trend: "neutral",
  },
];

export const recentActivity = [
  {
    title: "Welcome to MarketAI!",
    description: "Complete your first generation",
    icon: Sparkles,
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-500/10",
    action: "Get Started",
    href: "/tools/headline-generator",
  },
  {
    title: "Explore AI Tools",
    description: "Check out all available features",
    icon: Target,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
    action: "Browse Tools",
    href: "/tools/headline-generator",
  },
];


// src/lib/constants/dashboard-tools.ts
import { toolConfigs } from "@/lib/tools/configs";
import { LucideIcon } from "lucide-react";

// Convert tool configs to dashboard format
export interface DashboardAiTool {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  features: string[];
  badge: string;
  color: string;
}

// Feature bullets for each tool (customize as needed)
const toolFeatures: Record<string, string[]> = {
  "headline-generator": [
    "Multiple headline styles",
    "A/B testing recommendations",
    "Conversion-optimized copy",
  ],
  "description-generator": [
    "SEO-friendly descriptions",
    "Multiple tone options",
    "Custom word counts",
  ],
  "benefit-bullets": [
    "Feature-to-benefit conversion",
    "Emotional appeal analysis",
    "Dream outcome mapping",
  ],
  "ad-copy-generator": [
    "Facebook & Instagram ads",
    "Platform-specific optimization",
    "CTA recommendations",
  ],
  "email-subject-line": [
    "High open-rate formulas",
    "Personalization options",
    "Best practices included",
  ],
};

// Color gradients for each tool
const toolColors: Record<string, string> = {
  "headline-generator": "from-primary to-purple-600",
  "description-generator": "from-blue-500 to-teal-500",
  "benefit-bullets": "from-yellow-500 to-orange-500",
  "ad-copy-generator": "from-pink-500 to-purple-500",
  "email-subject-line": "from-green-500 to-emerald-500",
};

// Export function to get all tools for dashboard
export function getDashboardTools(): DashboardAiTool[] {
  return Object.values(toolConfigs).map((tool) => ({
    title: tool.name,
    description: tool.description,
    href: `/tools/${tool.id}`,
    icon: tool.icon,
    features: toolFeatures[tool.id] || [
      "AI-powered generation",
      "Multiple variations",
      "Export options",
    ],
    badge: "AI",
    color: toolColors[tool.id] || "from-primary to-purple-600",
  }));
}