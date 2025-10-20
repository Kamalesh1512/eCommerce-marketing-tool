//lib/constants/onbaording.ts
import {
  Building2,
  DollarSign,
  Users,
  MessageSquare,
  Target,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Globe,
  Package,
  Heart,
  Zap,
  Shield,
  Star,
  Briefcase,
  Info,
  X,
  Plus,
} from "lucide-react";

export const steps = [
  {
    id: 1,
    title: "Business Basics",
    description: "Tell us about your company",
    icon: Building2,
  },
  {
    id: 2,
    title: "Business Scale",
    description: "Size and platform details",
    icon: DollarSign,
  },
  {
    id: 3,
    title: "Brand Voice",
    description: "How you communicate",
    icon: MessageSquare,
  },
  {
    id: 4,
    title: "Your Audience",
    description: "Who you serve",
    icon: Users,
  },
  {
    id: 5,
    title: "Your Uniqueness",
    description: "What sets you apart",
    icon: Target,
  },
  {
    id: 6,
    title: "Marketing Setup",
    description: "Channels and strategy",
    icon: TrendingUp,
  },
];

// Info content with examples
export const infoContent = {
  companyName: {
    title: "Why we need your company name",
    content:
      "Your company name helps us personalize all AI-generated content to match your brand identity. Every headline, description, and ad will feel authentically yours.",
    examples: [],
  },
  websiteUrl: {
    title: "Why we need your website URL",
    content:
      "We use your website to understand your brand style, tone, and visual identity. This ensures consistent messaging across all generated content.",
    examples: [],
  },
  skusCount: {
    title: "Why we need your SKU count",
    content:
      "Knowing the number of SKUs (products) your brand offers helps us tailor AI outputs to the scale of your catalog. For example, brands with many SKUs may get more structured, batch-friendly suggestions, while smaller catalogs get deeply personalized recommendations.",
    examples: [
      "e.g. 1–10 products for niche brands",
      "100+ products for large catalogs",
    ],
  },
  brandCategory: {
    title: "Why we need your industry",
    content:
      "Knowing your industry helps our AI use relevant terminology, address industry-specific pain points, and leverage trends that matter to your customers.",
    examples: [
      "Fashion & Apparel: Focus on style, trends, fit",
      "Health & Wellness: Emphasize benefits, results, lifestyle",
      "Electronics: Highlight specs, features, innovation",
    ],
  },
  currency: {
    title: "Why we need your currency",
    content:
      "Your primary currency ensures all pricing displays and calculations match your business operations and customer expectations.",
    examples: [],
  },
  revenueBracket: {
    title: "Why we need revenue information",
    content:
      "This helps us calibrate the sophistication level and marketing strategies appropriate for your business stage. Early-stage brands need different messaging than established enterprises.",
    examples: [
      "Pre-launch: Focus on anticipation, early-bird offers",
      "$1M-$5M: Emphasize proven track record, growth",
      "$10M+: Highlight authority, scale, reliability",
    ],
  },
  platform: {
    title: "Why we need your platform",
    content:
      "Platform-specific insights help us optimize copy for where your customers actually shop. Each platform has unique best practices for product descriptions and CTAs.",
    examples: [],
  },
  targetMarketLocation: {
    title: "Why we need target markets",
    content:
      "Knowing your geographic markets helps us use appropriate language, cultural references, and address region-specific needs or preferences.",
    examples: [
      "US-focused: American spelling, imperial units",
      "UK-focused: British spelling, metric system",
      "Global: Universal language, avoid region-specific terms",
    ],
  },
  brandTone: {
    title: "Why brand tone matters",
    content:
      "Your tone of voice ensures every headline, description, and ad feels authentically 'you' — not generic AI content. It's the personality behind your words.",
    examples: [
      "Professional: 'Engineered for performance'",
      "Casual: 'Your new favorite thing is here'",
      "Luxury: 'Exquisite craftsmanship, refined taste'",
      "Playful: 'Get ready to fall in love! 💕'",
    ],
  },
  coreValues: {
    title: "Why core values matter",
    content:
      "Core values infuse your copy with meaning and help customers connect emotionally with your brand. They're not just words—they're promises.",
    examples: [
      "Sustainability: 'Eco-friendly materials, carbon-neutral shipping'",
      "Quality: 'Built to last, lifetime warranty included'",
      "Innovation: 'Patent-pending technology, first of its kind'",
    ],
  },
  brandKeywords: {
    title: "Why brand keywords help",
    content:
      "These descriptive words become the DNA of your content. They're strategically woven into headlines, descriptions, and ads to reinforce your brand identity.",
    examples: [
      "Luxury brand: elegant, refined, timeless, exclusive",
      "Outdoor brand: rugged, adventure-ready, durable, weatherproof",
      "Minimalist brand: clean, simple, essential, modern",
    ],
  },
  primaryAudience: {
    title: "Why audience understanding is critical",
    content:
      "Understanding your audience ensures we write content that resonates with the right people using language they relate to. We speak to THEM, not at them.",
    examples: [
      "Young professionals: Time-saving, career-enhancing",
      "Parents: Safety, convenience, family-friendly",
      "Fitness enthusiasts: Performance, results, goals",
    ],
  },
  painPoints: {
    title: "Why pain points drive conversions",
    content:
      "Addressing specific frustrations makes your copy more compelling and shows you understand your customers' real problems. Pain creates urgency to buy.",
    examples: [
      "Finding quality products → 'Premium materials, rigorously tested'",
      "High shipping costs → 'Free shipping on all orders'",
      "Complex returns → 'Hassle-free 60-day returns'",
    ],
  },
  differentiators: {
    title: "Why differentiators are your superpower",
    content:
      "Your unique selling points become the foundation for benefit bullets, headlines, and persuasive ad copy. They answer: 'Why should I buy from YOU?'",
    examples: [
      "Lifetime warranty",
      "Handmade in small batches",
      "Patent-pending technology",
      "Carbon-neutral shipping",
      "24/7 customer support",
    ],
  },
  channels: {
    title: "Why marketing channels matter",
    content:
      "Each platform has different best practices, character limits, and audience expectations. We optimize your content for where you actually advertise.",
    examples: [
      "Facebook: Longer storytelling, emotional connection",
      "Instagram: Visual-first, concise captions, hashtags",
      "Google Ads: Keyword-focused, clear value prop, 30 chars",
      "Email: Compelling subject lines, personalized content",
    ],
  },
};

// Countries list
export const countries = [
  { value: "global", label: "🌍 Global (All Markets)" },
  { value: "US", label: "🇺🇸 United States" },
  { value: "CA", label: "🇨🇦 Canada" },
  { value: "GB", label: "🇬🇧 United Kingdom" },
  { value: "AU", label: "🇦🇺 Australia" },
  { value: "DE", label: "🇩🇪 Germany" },
  { value: "FR", label: "🇫🇷 France" },
  { value: "IT", label: "🇮🇹 Italy" },
  { value: "ES", label: "🇪🇸 Spain" },
  { value: "NL", label: "🇳🇱 Netherlands" },
  { value: "SE", label: "🇸🇪 Sweden" },
  { value: "IN", label: "🇮🇳 India" },
  { value: "JP", label: "🇯🇵 Japan" },
  { value: "SG", label: "🇸🇬 Singapore" },
  { value: "AE", label: "🇦🇪 UAE" },
  { value: "MX", label: "🇲🇽 Mexico" },
  { value: "BR", label: "🇧🇷 Brazil" },
  { value: "NZ", label: "🇳🇿 New Zealand" },
];

export const brandCategories = [
  "Fashion & Apparel",
  "Beauty & Cosmetics",
  "Home & Living",
  "Electronics & Gadgets",
  "Health & Wellness",
  "Sports & Outdoors",
  "Travel & Luggage",
  "Jewelry & Accessories",
  "Food & Beverage",
  "Pet Products",
  "Baby & Kids",
  "Books & Media",
  "Arts & Crafts",
  "Automotive",
  "Office & Stationery",
  "Other",
];

export const revenueBrackets = [
  "Pre-launch / No revenue yet",
  "< $100K",
  "$100K - $500K",
  "$500K - $1M",
  "$1M - $5M",
  "$5M - $10M",
  "$10M+",
];

export const platforms = [
  { value: "Shopify", icon: "🛍️" },
  { value: "WooCommerce", icon: "🔌" },
  { value: "BigCommerce", icon: "🏪" },
  { value: "Magento", icon: "🎯" },
  // { value: "Amazon", icon: "📦" },
  // { value: "Etsy", icon: "🎨" },
  { value: "Custom", icon: "⚙️" },
  { value: "Other", icon: "📋" },
];

export const currencies = [
  { value: "USD", label: "USD - US Dollar", flag: "🇺🇸", symbol: "$" },
  { value: "EUR", label: "EUR - Euro", flag: "🇪🇺", symbol: "€" },
  { value: "GBP", label: "GBP - British Pound", flag: "🇬🇧", symbol: "£" },
  { value: "CAD", label: "CAD - Canadian Dollar", flag: "🇨🇦", symbol: "$" },
  { value: "AUD", label: "AUD - Australian Dollar", flag: "🇦🇺", symbol: "$" },
  { value: "INR", label: "INR - Indian Rupee", flag: "🇮🇳", symbol: "₹" },
];

export const brandTones = [
  {
    value: "professional",
    label: "Professional",
    icon: Briefcase,
    desc: "Formal, trustworthy, authoritative",
  },
  {
    value: "casual",
    label: "Casual & Friendly",
    icon: Heart,
    desc: "Approachable, conversational, warm",
  },
  {
    value: "luxury",
    label: "Luxury & Premium",
    icon: Star,
    desc: "Sophisticated, elegant, exclusive",
  },
  {
    value: "playful",
    label: "Playful & Fun",
    icon: Sparkles,
    desc: "Energetic, quirky, entertaining",
  },
  {
    value: "inspirational",
    label: "Inspirational",
    icon: Zap,
    desc: "Motivating, uplifting, aspirational",
  },
  {
    value: "educational",
    label: "Educational",
    icon: Target,
    desc: "Informative, helpful, expert",
  },
];

export const coreValuesOptions = [
  { value: "sustainability", label: "Sustainability", icon: "🌱" },
  { value: "innovation", label: "Innovation", icon: "💡" },
  { value: "quality", label: "Quality", icon: "⭐" },
  { value: "craftsmanship", label: "Craftsmanship", icon: "🔨" },
  { value: "transparency", label: "Transparency", icon: "🔍" },
  { value: "community", label: "Community", icon: "🤝" },
  { value: "affordability", label: "Affordability", icon: "💰" },
  { value: "reliability", label: "Reliability", icon: "🛡️" },
  { value: "inclusivity", label: "Inclusivity", icon: "🌈" },
  { value: "authenticity", label: "Authenticity", icon: "✨" },
];

export const marketingChannels = [
  { value: "Facebook", label: "Facebook Ads", icon: "📘" },
  { value: "Instagram", label: "Instagram Ads", icon: "📸" },
  { value: "Email", label: "Email Marketing", icon: "📧" },
  { value: "Google", label: "Google Ads", icon: "🔍" },
  { value: "TikTok", label: "TikTok Ads", icon: "🎵" },
  { value: "LinkedIn", label: "LinkedIn Ads", icon: "💼" },
  { value: "Pinterest", label: "Pinterest", icon: "📌" },
  { value: "SEO", label: "SEO / Organic", icon: "🌐" },
];

export const audienceSuggestions = [
  "Young professionals (25-35)",
  "Parents with young children",
  "Fitness enthusiasts",
  "Eco-conscious consumers",
  "Luxury shoppers",
  "Budget-conscious families",
  "Tech-savvy millennials",
  "Health-conscious individuals",
  "Creative professionals",
  "Small business owners",
];

export const painPointSuggestions = [
  "Finding quality products",
  "High shipping costs",
  "Limited size/color options",
  "Unclear product information",
  "Long delivery times",
  "Lack of customer support",
  "Complex return process",
  "No eco-friendly options",
  "Overpriced products",
  "Generic, mass-produced items",
];
