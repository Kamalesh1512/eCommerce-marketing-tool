//src/app/(auth)/onboarding
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { currencies } from "@/lib/constants/onboarding";

// Import all modular components
import { OnboardingHeader } from "@/components/onboarding/onboarding-header";
import { OnboardingProgressHeader } from "@/components/onboarding/onboarding-progress";
import { StepWrapper } from "@/components/onboarding/onboarding-stepWrapper";
import { StepNavigation } from "@/components/onboarding/onboarding-stepNavigation";
import { StepOneBusinessBasics } from "@/components/onboarding/steps/onboarding-businessBasics";
import { StepTwoBusinessScale } from "@/components/onboarding/steps/onboarding-businessScale";
import { StepThreeBrandVoice } from "@/components/onboarding/steps/onboarding-brandVoice";
import { StepFourAudience } from "@/components/onboarding/steps/onboarding-targetAudience";
import { StepFiveUniqueness } from "@/components/onboarding/steps/onboarding-uniqueness";
import { MarketingSetup } from "@/components/onboarding/steps/onboarding-marketSetup";

export default function OnboardingPage() {
  const { data: session, update } = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    websiteUrl: "",
    brandCategory: "",
    currency: "USD",
    revenueBracket: "",
    platform: "",
    skusCount: "",
    targetMarketLocation: [] as string[],
    brandTone: "",
    brandToneSample: "",
    coreValues: [] as string[],
    brandKeywords: [] as string[],
    primaryAudience: [] as string[],
    audienceDemographics: "",
    painPoints: [] as string[],
    dreamOutcome: "",
    differentiators: [] as string[],
    socialProofPoints: "",
    uniqueSellingProposition: "",
    preferredChannels: [] as string[],
    averageOrderValue: "",
    topProducts: [] as string[],
    primaryCTA: "Shop Now",
    shippingPolicy: "",
  });

  const getCurrencySymbol = () => {
    const curr = currencies.find((c) => c.value === formData.currency);
    return curr?.symbol || "$";
  };

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleArrayValue = (arrayName: string, value: string) => {
    setFormData((prev) => {
      const array = prev[arrayName as keyof typeof prev] as string[];
      const newArray = array.includes(value)
        ? array.filter((item) => item !== value)
        : [...array, value];
      return { ...prev, [arrayName]: newArray };
    });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.companyName.trim() !== "" && formData.brandCategory !== ""
        );
      case 2:
        return (
          formData.currency !== "" &&
          formData.platform !== "" &&
          formData.targetMarketLocation.length > 0
        );
      case 3:
        return formData.brandTone !== "" && formData.coreValues.length > 0;
      case 4:
        return formData.primaryAudience.length > 0;
      case 5:
        return formData.differentiators.length > 0;
      case 6:
        return formData.preferredChannels.length > 0;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/brand-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to create brand profile");
      }

      // Update session
      await update({
        ...session,
        user: {
          ...session?.user,
          hasCompletedOnboarding: true,
        },
      });

      // Force session refresh
      await fetch("/api/auth/session?update", { cache: "no-store" });

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const progress = (currentStep / 6) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOneBusinessBasics
            formData={formData}
            handleChange={handleChange}
          />
        );
      case 2:
        return (
          <StepTwoBusinessScale
            formData={formData}
            handleChange={handleChange}
          />
        );
      case 3:
        return (
          <StepThreeBrandVoice
            formData={formData}
            handleChange={handleChange}
            toggleArrayValue={toggleArrayValue}
          />
        );
      case 4:
        return (
          <StepFourAudience
            formData={formData}
            handleChange={handleChange}
          />
        );
      case 5:
        return (
          <StepFiveUniqueness
            formData={formData}
            handleChange={handleChange}
          />
        );
      case 6:
        return (
          <MarketingSetup
            formData={formData}
            onUpdate={handleChange}
            onToggleArrayValue={toggleArrayValue}
            getCurrencySymbol={getCurrencySymbol}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <OnboardingHeader />

        {/* Progress Header */}
        <OnboardingProgressHeader currentStep={currentStep} progress={progress} />

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StepWrapper currentStep={currentStep}>
              {/* Error Display */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg"
                >
                  <p className="text-destructive text-sm font-medium">
                    {error}
                  </p>
                </motion.div>
              )}

              {/* Render Current Step */}
              {renderStepContent()}

              {/* Navigation Buttons */}
              <StepNavigation
                currentStep={currentStep}
                totalSteps={6}
                loading={loading}
                isStepValid={isStepValid()}
                onBack={handleBack}
                onNext={handleNext}
                onSubmit={handleSubmit}
              />
            </StepWrapper>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}