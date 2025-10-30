// components/onboarding/onboarding-progress.tsx
'use client'
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { steps } from "@/lib/constants/onboarding";

interface OnboardingProgressHeaderProps {
  currentStep: number;
  progress: number;
}

export const OnboardingProgressHeader: React.FC<OnboardingProgressHeaderProps> = ({
  currentStep,
  progress,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mb-8"
    >
      <Card className="border-border/50 backdrop-blur-sm bg-card/80">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4 overflow-x-auto pb-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-br from-primary to-purple-600 text-white shadow-lg scale-110"
                          : isCompleted
                          ? "bg-green-500 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </motion.div>
                    <span className="text-xs font-medium mt-2 text-center max-w-[80px] hidden md:block">
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 w-8 lg:w-12 mx-2 rounded transition-all duration-300 ${
                        isCompleted ? "bg-green-500" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground text-center mt-3">
            Step {currentStep} of {steps.length} • {Math.round(progress)}%
            Complete
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};