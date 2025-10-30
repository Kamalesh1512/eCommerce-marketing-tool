"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const OnboardingHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <Badge variant="outline" className="mb-4 px-4 py-2">
        <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
        Quick Setup - 5 minutes
      </Badge>
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-3">
        Let's Build Your Brand Profile
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Answer a few questions so our AI can generate content that sounds
        exactly like your brand
      </p>
    </motion.div>
  );
};
