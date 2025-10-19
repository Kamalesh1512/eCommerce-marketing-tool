"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  DollarSign,
  ShoppingCart,
  Users,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    id: 1,
    title: "Company Details",
    description: "Tell us about your business",
    icon: Building2,
  },
  {
    id: 2,
    title: "Business Metrics",
    description: "Share your business size",
    icon: DollarSign,
  },
  {
    id: 3,
    title: "Target Audience",
    description: "Who are your customers?",
    icon: Users,
  },
  {
    id: 4,
    title: "Brand Voice",
    description: "Define your brand personality",
    icon: MessageSquare,
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    revenueBracket: "",
    platform: "",
    currency: "USD",
    brandToneSample: "",
    primaryAudience: "",
    skusCount: 0,
  });

  const revenueBrackets = [
    "< $100K",
    "$100K - $500K",
    "$500K - $1M",
    "$1M - $5M",
    "$5M - $10M",
    "$10M+",
  ];

  const platforms = [
    { value: "Shopify", emoji: "🛍️" },
    { value: "WooCommerce", emoji: "🔌" },
    { value: "BigCommerce", emoji: "🏪" },
    { value: "Magento", emoji: "🎯" },
    { value: "Custom", emoji: "⚙️" },
    { value: "Other", emoji: "📦" },
  ];

  const currencies = [
    { value: "USD", label: "USD - US Dollar", flag: "🇺🇸" },
    { value: "EUR", label: "EUR - Euro", flag: "🇪🇺" },
    { value: "GBP", label: "GBP - British Pound", flag: "🇬🇧" },
    { value: "CAD", label: "CAD - Canadian Dollar", flag: "🇨🇦" },
    { value: "AUD", label: "AUD - Australian Dollar", flag: "🇦🇺" },
    { value: "INR", label: "INR - Indian Rupee", flag: "🇮🇳" },
  ];

  const brandVoiceExamples = [
    {
      label: "Professional & Formal",
      description: "Corporate, trustworthy tone",
    },
    { label: "Friendly & Casual", description: "Approachable, conversational" },
    { label: "Luxury & Premium", description: "Sophisticated, exclusive" },
    { label: "Fun & Playful", description: "Energetic, lighthearted" },
  ];

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.companyName.trim() !== "";
      case 2:
        return true; // Optional fields
      case 3:
        return true; // Optional fields
      case 4:
        return true; // Optional fields
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/brand-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create brand profile");
      }

      await update({
        ...session,
        user: {
          ...session?.user,
          brandProfileCompleted: true,
        },
      });

      // 🔥 Force re-fetch the session token (JWT) from the server
      await fetch("/api/auth/session?update", { cache: "no-store" });

      // Then hard redirect — ensures middleware uses updated token
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const progress = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/90 to-muted relative overflow-hidden transition-colors">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400/20 dark:bg-purple-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300/20 dark:bg-pink-700/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full shadow-sm mb-4 border border-border">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-muted-foreground">
              Welcome to Your Journey
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Let's Build Your Brand Profile
          </h1>
          <p className="text-lg text-muted-foreground">
            This will help us personalize your experience
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-lg scale-110"
                            : isCompleted
                            ? "bg-green-500 text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-6 h-6" />
                        ) : (
                          <Icon className="w-6 h-6" />
                        )}
                      </div>
                      <span className="text-xs font-medium mt-2 text-muted-foreground hidden md:block">
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-1 flex-1 mx-2 rounded transition-all duration-300 ${
                          isCompleted ? "bg-green-500" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </motion.div>

        {/* Form Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border border-border shadow-2xl bg-card/90 backdrop-blur-sm">
              <CardHeader className="space-y-1 pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    {React.createElement(steps[currentStep - 1].icon, {
                      className: "w-5 h-5 text-white",
                    })}
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-primary">
                      {steps[currentStep - 1].title}
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                      {steps[currentStep - 1].description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg"
                  >
                    <p className="text-destructive text-sm font-medium">{error}</p>
                  </motion.div>
                )}

                {/* Step 1: Company Details */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Label
                        htmlFor="companyName"
                        className="text-base font-semibold"
                      >
                        Company Name *
                      </Label>
                      <Input
                        id="companyName"
                        placeholder="Acme Corporation"
                        value={formData.companyName}
                        onChange={(e) =>
                          handleChange("companyName", e.target.value)
                        }
                        className="h-12 text-base"
                        required
                      />
                      <p className="text-sm text-muted-foreground">
                        The official name of your business
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="platform"
                        className="text-base font-semibold"
                      >
                        E-commerce Platform
                      </Label>
                      <Select
                        value={formData.platform}
                        onValueChange={(value) =>
                          handleChange("platform", value)
                        }
                      >
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Select your platform" />
                        </SelectTrigger>
                        <SelectContent>
                          {platforms.map((platform) => (
                            <SelectItem
                              key={platform.value}
                              value={platform.value}
                            >
                              <div className="flex items-center gap-2">
                                <span>{platform.emoji}</span>
                                <span>{platform.value}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Business Metrics */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Label
                        htmlFor="revenueBracket"
                        className="text-base font-semibold"
                      >
                        Annual Revenue
                      </Label>
                      <Select
                        value={formData.revenueBracket}
                        onValueChange={(value) =>
                          handleChange("revenueBracket", value)
                        }
                      >
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Select revenue range" />
                        </SelectTrigger>
                        <SelectContent>
                          {revenueBrackets.map((bracket) => (
                            <SelectItem key={bracket} value={bracket}>
                              {bracket}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="currency"
                        className="text-base font-semibold"
                      >
                        Primary Currency
                      </Label>
                      <Select
                        value={formData.currency}
                        onValueChange={(value) =>
                          handleChange("currency", value)
                        }
                      >
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem
                              key={currency.value}
                              value={currency.value}
                            >
                              <div className="flex items-center gap-2">
                                <span>{currency.flag}</span>
                                <span>{currency.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="skusCount"
                        className="text-base font-semibold"
                      >
                        Number of Products (SKUs)
                      </Label>
                      <Input
                        id="skusCount"
                        type="number"
                        min="0"
                        placeholder="100"
                        value={formData.skusCount || ""}
                        onChange={(e) =>
                          handleChange(
                            "skusCount",
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="h-12 text-base"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Target Audience */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Label
                        htmlFor="primaryAudience"
                        className="text-base font-semibold"
                      >
                        Describe Your Target Customers
                      </Label>
                      <Textarea
                        id="primaryAudience"
                        rows={5}
                        placeholder="e.g., Young professionals aged 25-35 interested in sustainable fashion, tech-savvy millennials who value quality over quantity..."
                        value={formData.primaryAudience}
                        onChange={(e) =>
                          handleChange("primaryAudience", e.target.value)
                        }
                        className="text-base resize-none"
                      />
                      <p className="text-sm text-gray-500">
                        The more specific, the better we can tailor content
                      </p>
                    </div>

                    {/* Audience Suggestions */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { emoji: "👔", label: "B2B Professionals" },
                        { emoji: "🛍️", label: "Retail Shoppers" },
                        { emoji: "💼", label: "Enterprise Buyers" },
                        { emoji: "🎯", label: "Niche Markets" },
                      ].map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() =>
                            handleChange(
                              "primaryAudience",
                              formData.primaryAudience
                                ? `${formData.primaryAudience}, ${item.label}`
                                : item.label
                            )
                          }
                          className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:from-purple-700 hover:to-primary transition-all duration-200 text-left"
                        >
                          <div className="text-3xl mb-2">{item.emoji}</div>
                          <div className="text-sm font-medium text-muted-foreground">
                            {item.label}
                          </div>
                        </button>
                      ))}
                    </div>

                  </motion.div>
                )}

                {/* Step 4: Brand Voice */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">
                        Brand Voice Examples
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        {brandVoiceExamples.map((example) => (
                          <button
                            key={example.label}
                            type="button"
                            onClick={() =>
                              handleChange("brandToneSample", example.label)
                            }
                            className={`p-4 border-2 border-dashed border-gray-200 rounded-lg hover:from-purple-700 hover:to-primary transition-all duration-200 text-left ${
                              formData.brandToneSample === example.label
                                ? "border-blue-500 bg-gradient-to-br from-primary to-purple-600 hover:from-purple-700 text-secondary"
                                : "border-gray-200 hover:border-blue-300 hover:from-purple-700 hover:to-primary"
                            }`}
                          >
                            <div className="font-semibold text-sm text-primary mb-1">
                              {example.label}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {example.description}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="brandToneSample"
                        className="text-base font-semibold"
                      >
                        Brand Voice Sample (Optional)
                      </Label>
                      <Textarea
                        id="brandToneSample"
                        rows={5}
                        placeholder="Paste a sample of your brand's writing or describe your unique voice..."
                        value={formData.brandToneSample}
                        onChange={(e) =>
                          handleChange("brandToneSample", e.target.value)
                        }
                        className="text-base resize-none"
                      />
                      <p className="text-sm text-gray-500">
                        This helps us match your brand's unique personality
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="h-12 px-6"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>

                  <div className="text-sm text-gray-500">
                    Step {currentStep} of {steps.length}
                  </div>

                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!isStepValid()}
                      className="h-12 px-6 bg-gradient-to-br from-primary to-purple-600 hover:from-purple-700 hover:to-primary"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading || !isStepValid()}
                      className="h-12 px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Creating...
                        </>
                      ) : (
                        <>
                          Complete Setup
                          <Check className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-600">
            🔒 Your information is secure and will only be used to personalize
            your experience
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
