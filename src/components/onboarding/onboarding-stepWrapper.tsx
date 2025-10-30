'use client'
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { steps } from "@/lib/constants/onboarding";

interface StepWrapperProps {
  currentStep: number;
  children: React.ReactNode;
}

export const StepWrapper: React.FC<StepWrapperProps> = ({ currentStep, children }) => {
  return (
    <Card className="border-border/50 shadow-2xl backdrop-blur-sm bg-card/90">
      <CardHeader className="space-y-2 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
            {React.createElement(steps[currentStep - 1].icon, {
              className: "w-6 h-6 text-white",
            })}
          </div>
          <div>
            <CardTitle className="text-2xl">
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription className="text-base">
              {steps[currentStep - 1].description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {children}
      </CardContent>
    </Card>
  );
};