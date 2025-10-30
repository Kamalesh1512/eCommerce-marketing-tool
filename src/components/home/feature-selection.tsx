"use client";
import {
  Check,
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
import { Card } from "../ui/card";

// Features Section Component
export const FeaturesSection: React.FC = () => {
  const tools = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Offer Headline Generator",
      description:
        "Transform 'Durable Aluminum Wallet' into 'The Last Wallet You'll Ever Own—Guaranteed For Life'",
      result: "Stop competing on price. Own your value proposition.",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Story-Based Descriptions",
      description:
        "Turn feature lists into emotional narratives that sell dream outcomes, not specs",
      result: "Higher add-to-cart rates. Lower bounce rates.",
    },
    {
      icon: <Megaphone className="w-6 h-6" />,
      title: "Stop-The-Scroll Ads",
      description:
        "Facebook & Instagram copy engineered to grab attention in the first 3 seconds",
      result: "Lower CPC. Higher CTR. Better ROAS.",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "High-Impact Subject Lines",
      description:
        "Psychological triggers that turn 10% open rates into 40%+ engagement",
      result: "Your list becomes a revenue machine.",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Feature-to-Benefit Translator",
      description:
        "Automatically convert '16GB RAM' into 'Run 50 tabs without crashes'",
      result: "Customers understand WHY they need it.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Bulk CSV Processing",
      description:
        "Upload 100 products, get 100 professional descriptions in minutes",
      result: "Scale your store without scaling your workload.",
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
          <Badge variant="outline" className="mb-4 bg-green-400">
            The Solution
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            6 Tools That Solve Every Copy Problem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every touchpoint optimized. Every word engineered to convert.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {tool.icon}
                  </div>
                  <h3 className="font-semibold text-lg">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium text-primary flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      {tool.result}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
