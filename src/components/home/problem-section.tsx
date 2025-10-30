"use client";
import { useInView, motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { PainPoint } from "../animation/pain-point";
import { Card } from "../ui/card";
import { X } from "lucide-react";

// Problem Section Component
export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: <X className="w-5 h-5" />,
      problem: "Generic headlines that make you invisible",
      impact: "Lost to competitors before prospects read line two",
    },
    {
      icon: <X className="w-5 h-5" />,
      problem: "Feature lists that create zero emotion",
      impact: "High bounce rates, abandoned carts",
    },
    {
      icon: <X className="w-5 h-5" />,
      problem: "Ads that get scrolled past instantly",
      impact: "Burning $1000s on clicks that never convert",
    },
    {
      icon: <X className="w-5 h-5" />,
      problem: "Emails with 10% open rates",
      impact: "Your biggest asset sitting unused",
    },
  ];

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            The Real Problem
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Bad Copy = Lost Revenue
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            You're spending money on traffic, but losing sales to copy that
            fails to sell your value.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {problems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="p-6 border-destructive/20 bg-destructive/5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 text-destructive">
                    {item.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{item.problem}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.impact}
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
