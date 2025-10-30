'use client'
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  loading: boolean;
  isStepValid: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  loading,
  isStepValid,
  onBack,
  onNext,
  onSubmit,
}) => {
  return (
    <div className="flex justify-between items-center pt-6">
      <Button
        type="button"
        variant="outline"
        disabled={currentStep === 1 || loading}
        onClick={onBack}
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back
      </Button>
      {currentStep < totalSteps ? (
        <Button
          type="button"
          onClick={onNext}
          disabled={!isStepValid || loading}
        >
          Next
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onSubmit}
          disabled={!isStepValid || loading}
        >
          {loading ? "Finishing..." : "Finish"}
        </Button>
      )}
    </div>
  );
};