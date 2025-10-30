// lib/constants/proTipsConfig.ts - Pro Tips for Each Tool

import {
  Target,
  Lightbulb,
  FlaskRound,
  Hash,
  FileText,
  Palette,
  Type,
  LayoutList,
  Zap,
  Flame,
  Heart,
  Focus,
  Facebook,
  Megaphone,
  MousePointerClick,
  Clock3,
  Mail,
  User,
  Eye,
  Split,
  ShieldAlert,
} from "lucide-react";

export const proTipsConfig = {
  "headline-generator": [
    {
      icon: Target,
      title: "Be specific",
      description:
        '"Slim wallet" is better than "good wallet". Numbers and concrete details convert better.',
    },
    {
      icon: Lightbulb,
      title: "Lead with benefits",
      description:
        'Focus on outcomes, not features. "Never worry about rain" beats "Waterproof material".',
    },
    {
      icon: FlaskRound,
      title: "Test variations",
      description:
        "Try different headline types (benefit-driven, question, how-to) to see what resonates.",
    },
    {
      icon: Hash,
      title: "Use numbers",
      description:
        '"3X longer lasting" beats "very durable". Quantify your claims whenever possible.',
    },
  ],

  "description-generator": [
    {
      icon: FileText,
      title: "Tell a story",
      description:
        "Great descriptions paint a picture. Start with the dream outcome, not the product specs.",
    },
    {
      icon: Palette,
      title: "Use sensory language",
      description:
        'Help customers imagine using your product. "Buttery-soft leather" beats "high-quality material".',
    },
    {
      icon: Type,
      title: "Match your tone",
      description:
        "Professional for B2B, casual for lifestyle products, luxury for premium items. Be consistent.",
    },
    {
      icon: LayoutList,
      title: "Break it up",
      description:
        "Short paragraphs (2-3 sentences) are easier to scan. Use bullet points for features.",
    },
  ],

  "benefit-bullets": [
    {
      icon: Zap,
      title: "Start with the benefit",
      description:
        'Not the feature. "Stay organized effortlessly" comes before "6 card slots".',
    },
    {
      icon: Flame,
      title: "Use action words",
      description:
        '"Conquer", "transform", "eliminate" are stronger than "has", "includes", "features".',
    },
    {
      icon: Heart,
      title: "Connect to emotions",
      description:
        "Link benefits to feelings: confidence, freedom, peace of mind, status, security.",
    },
    {
      icon: Focus,
      title: "Be concrete",
      description:
        'Vague claims don’t convert. "Saves 2 hours per week" beats "saves time".',
    },
  ],

  "ad-copy": [
    {
      icon: Facebook,
      title: "Hook in 3 seconds",
      description:
        "The first sentence must stop the scroll. Use pain points, questions, or bold claims.",
    },
    {
      icon: Megaphone,
      title: "Platform matters",
      description:
        "Facebook = longer storytelling. Instagram = visual + short copy. Adapt accordingly.",
    },
    {
      icon: MousePointerClick,
      title: "Clear CTA",
      description:
        '"Shop Now" is better than "Learn More". Tell them exactly what to do next.',
    },
    {
      icon: Clock3,
      title: "Test urgency",
      description:
        "Limited-time offers and scarcity work, but don’t overuse. Keep it genuine.",
    },
  ],

  "email-subject-lines": [
    {
      icon: Mail,
      title: "Personalize when possible",
      description:
        "Using first names can increase open rates by 20%+. But avoid overusing it.",
    },
    {
      icon: Eye,
      title: "Create curiosity",
      description:
        '"You left something behind..." works better than "Complete your purchase".',
    },
    {
      icon: Split,
      title: "Test A/B everything",
      description:
        "Send 2–3 variations to small segments, then use the winner for the full list.",
    },
    {
      icon: ShieldAlert,
      title: "Avoid spam triggers",
      description:
        'ALL CAPS, excessive emojis 🔥🔥🔥, and "FREE!!!" can hurt deliverability.',
    },
  ],
};
