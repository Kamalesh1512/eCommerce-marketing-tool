"use client";
import {
  CheckCircle2,
  FileText,
  Mail,
  Megaphone,
  Target,
  Zap,
} from "lucide-react";

import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { FeatureCard } from "../animation/featured-cards";

// Features Section Component
export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      title: "Unbeatable Offer Headline Generator",
      description:
        "Transform boring product names into compelling offers that stop prospects in their tracks. Our AI doesn't just generate headlines—it architects offers that communicate value instantly.",
    },
    {
      icon: <FileText className="w-6 h-6 text-primary" />,
      title: "High-Converting Product Descriptions",
      description:
        "Automated storytelling that weaves features into narratives selling dream outcomes. Take customers from pain to satisfaction with benefit-driven copy that creates emotion and desire.",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
      title: "Benefit Bullets Converter",
      description:
        "Translate technical features into compelling benefits. Your customers don't buy RAM—they buy the ability to work smoothly without crashes. We make that translation automatic.",
    },
    {
      icon: <Megaphone className="w-6 h-6 text-primary" />,
      title: "Stop-The-Scroll Ad Copy Creator",
      description:
        "Facebook ad copy designed for the war of attention. Create powerful hooks that stop users mid-scroll and drive them to click, reducing your CPC and maximizing ROAS.",
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email Subject Line Engine",
      description:
        "Generate subject lines based on proven psychological triggers: curiosity, urgency, scarcity, social proof. Turn your email list into a revenue-generating machine.",
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Batch Processing & CSV Upload",
      description:
        "Scale your copywriting with bulk processing. Upload your product catalog via CSV and get professional copy for hundreds of products in minutes, not weeks.",
    },
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to Convert
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Six powerful tools working together to transform every touchpoint of
            your customer journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
