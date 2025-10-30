//lib/constants/sidebar

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


export const toolsNavigation = [
  {
    name: "Headline Generator",
    href: "/tools/headline-generator",
    icon: Target,
    description: "Create compelling headlines",
  },
  {
    name: "Product Description",
    href: "/tools/description-generator",
    icon: FileText,
    description: "Generate full descriptions",
  },
  {
    name: "Benefit Bullets",
    href: "/tools/benefit-bullets",
    icon: Zap,
    description: "Convert features to benefits",
  },
  {
    name: "Ad Copy Generator",
    href: "/tools/ad-copy-generator",
    icon: Facebook,
    description: "Facebook & Instagram ads",
  },
  {
    name: "Email Subject Lines",
    href: "/tools/email-subject-line",
    icon: Mail,
    description: "Optimize open rates",
  },
  {
    name: "Batch Processing",
    href: "/tools/batch-processing",
    icon: FolderOpen,
    description: "Bulk content generation",
  },
];

export const mainNavigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Generation History",
    href: "/history",
    icon: History,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
