"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";
import {
  audienceSuggestions,
  brandCategories,
  brandTones,
  coreValuesOptions,
  countries,
  currencies,
  infoContent,
  marketingChannels,
  painPointSuggestions,
  platforms,
  revenueBrackets,
  steps,
} from "@/lib/constants/onboarding";
import { InfoHoverCard } from "@/components/onboarding/info-hovercard";

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

  const TagInput = ({
    value,
    onChange,
    placeholder,
    suggestions,
  }: {
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder: string;
    suggestions?: string[];
  }) => {
    const [input, setInput] = useState("");

    const addTag = (tag: string) => {
      if (tag.trim() && !value.includes(tag.trim())) {
        onChange([...value, tag.trim()]);
        setInput("");
      }
    };

    const removeTag = (tagToRemove: string) => {
      onChange(value.filter((t) => t !== tagToRemove));
    };

    return (
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag(input);
              }
            }}
            placeholder={placeholder}
            className="h-10"
          />
          <Button
            type="button"
            onClick={() => addTag(input)}
            variant="outline"
            className="px-3"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        {value.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {value.map((tag, i) => (
              <Badge key={i} variant="secondary" className="pl-3 pr-1 py-1">
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-2 hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        {suggestions && suggestions.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Quick suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions
                .filter((s) => !value.includes(s))
                .slice(0, 5)
                .map((suggestion, i) => (
                  <Button
                    key={i}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addTag(suggestion)}
                    className="h-7 text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    {suggestion}
                  </Button>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const MultiSelectCountries = () => {
    const toggleCountry = (countryValue: string) => {
      if (countryValue === "global") {
        // If selecting global, clear all other selections
        setFormData((prev) => ({ ...prev, targetMarketLocation: ["global"] }));
      } else {
        // If selecting a specific country, remove global if present
        const filtered = formData.targetMarketLocation.filter((m) => m !== "global");
        const newMarkets = filtered.includes(countryValue)
          ? filtered.filter((m) => m !== countryValue)
          : [...filtered, countryValue];
        setFormData((prev) => ({ ...prev, targetMarketLocation: newMarkets }));
      }
    };

    return (
      <div className="space-y-2">
        <div className="max-h-64 overflow-y-auto border rounded-lg p-2 space-y-1">
          {countries.map((country) => (
            <div
              key={country.value}
              className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md cursor-pointer"
              onClick={() => toggleCountry(country.value)}
            >
              <Checkbox
                checked={formData.targetMarketLocation.includes(country.value)}
                onCheckedChange={() => toggleCountry(country.value)}
              />
              <label className="text-sm cursor-pointer flex-1">
                {country.label}
              </label>
            </div>
          ))}
        </div>
        {formData.targetMarketLocation.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {formData.targetMarketLocation.map((market) => {
              const country = countries.find((c) => c.value === market);
              return (
                <Badge
                  key={market}
                  variant="secondary"
                  className="pl-3 pr-1 py-1"
                >
                  {country?.label || market}
                  <button
                    onClick={() => toggleCountry(market)}
                    className="ml-2 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              );
            })}
          </div>
        )}
      </div>
    );
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
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
                    <div
                      key={step.id}
                      className="flex items-center flex-shrink-0"
                    >
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

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
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

                {/* Step 1: Business Basics */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      {/* Company Name Field */}
                      <div>
                        <Label htmlFor="companyName">
                          Company Name
                          <InfoHoverCard info={infoContent["companyName"]} />
                        </Label>

                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) =>
                            handleChange("companyName", e.target.value)
                          }
                          placeholder="e.g. Acme Co."
                          className="mt-1"
                          autoComplete="off"
                          required
                        />
                      </div>
                    </div>
                    {/* Brand Category Dropdown */}
                    <div>
                      <Label htmlFor="brandCategory">
                        Industry / Brand Category
                        <InfoHoverCard info={infoContent["brandCategory"]} />
                      </Label>
                      <Select
                        value={formData.brandCategory}
                        onValueChange={(val) =>
                          handleChange("brandCategory", val)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {brandCategories.map((cat, i) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Website URL (optional) */}
                    <div>
                      <Label htmlFor="websiteUrl">
                        Website URL (optional)
                        <InfoHoverCard info={infoContent["websiteUrl"]} />
                      </Label>
                      <Input
                        id="websiteUrl"
                        value={formData.websiteUrl}
                        onChange={(e) =>
                          handleChange("websiteUrl", e.target.value)
                        }
                        placeholder="e.g. https://acme.co"
                        className="mt-1"
                        autoComplete="off"
                        type="url"
                      />
                    </div>

                    {/* Skus Count */}
                    <div>
                      <Label htmlFor="skusCount">
                        Number of SKUs
                        <InfoHoverCard info={infoContent["skusCount"]} />
                      </Label>
                      <Input
                        id="skusCount"
                        type="number"
                        value={formData.skusCount}
                        onChange={(e) =>
                          handleChange("skusCount", Number(e.target.value))
                        }
                        placeholder="e.g. 25"
                        className="mt-1"
                        autoComplete="off"
                        min={0}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Business Scale */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {/* Currency */}
                    <div>
                      <Label>
                        Currency
                        <InfoHoverCard info={infoContent["currency"]} />
                      </Label>
                      <Select
                        value={formData.currency}
                        onValueChange={(val) => handleChange("currency", val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              {c.flag} {c.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Revenue Bracket */}
                    <div>
                      <Label>
                        Annual Revenue
                        <InfoHoverCard info={infoContent["revenueBracket"]} />
                      </Label>
                      <Select
                        value={formData.revenueBracket}
                        onValueChange={(val) =>
                          handleChange("revenueBracket", val)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a range" />
                        </SelectTrigger>
                        <SelectContent>
                          {revenueBrackets.map((b) => (
                            <SelectItem key={b} value={b}>
                              {b}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Platform */}
                    <div>
                      <Label>
                        E-commerce Platform
                        <InfoHoverCard info={infoContent["platform"]} />
                      </Label>
                      <Select
                        value={formData.platform}
                        onValueChange={(val) => handleChange("platform", val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your platform" />
                        </SelectTrigger>
                        <SelectContent>
                          {platforms.map((p) => (
                            <SelectItem key={p.value} value={p.value}>
                              {p.icon} {p.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Target Markets (Countries Multi-select) */}
                    <div>
                      <Label>
                        Target Markets
                        <InfoHoverCard info={infoContent["targetMarketLocation"]} />
                      </Label>
                      <MultiSelectCountries />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Brand Voice */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {/* Brand Tone */}
                    <div>
                      <Label>
                        Brand Tone/Personality
                        <InfoHoverCard info={infoContent["brandTone"]} />
                      </Label>
                      <div className="flex flex-wrap gap-3 pt-2">
                        {brandTones.map((tone) => (
                          <Button
                            key={tone.value}
                            variant={
                              formData.brandTone === tone.value
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              handleChange("brandTone", tone.value)
                            }
                            className="flex items-center gap-2"
                            type="button"
                          >
                            <tone.icon className="w-4 h-4" />
                            {tone.label}
                          </Button>
                        ))}
                      </div>
                      {formData.brandTone && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {
                            brandTones.find(
                              (t) => t.value === formData.brandTone
                            )?.desc
                          }
                        </p>
                      )}
                    </div>

                    {/* Brand Tone Sample (optional) */}
                    <div>
                      <Label htmlFor="brandToneSample">
                        Brand Tone - Simple Headline/Slogan (optional)
                      </Label>
                      <Input
                        id="brandToneSample"
                        value={formData.brandToneSample}
                        onChange={(e) =>
                          handleChange("brandToneSample", e.target.value)
                        }
                        placeholder="e.g. Built for the modern explorer"
                      />
                    </div>

                    {/* Core Values (multi-checkbox) */}
                    <div>
                      <Label>
                        Core Values
                        <InfoHoverCard info={infoContent["coreValues"]} />
                      </Label>
                      <div className="flex flex-wrap gap-3 pt-2">
                        {coreValuesOptions.map((v) => (
                          <Button
                            key={v.value}
                            variant={
                              formData.coreValues.includes(v.value)
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              toggleArrayValue("coreValues", v.value)
                            }
                            className="flex items-center gap-2"
                            type="button"
                          >
                            <span>{v.icon}</span>
                            {v.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Brand Keywords (TagInput) */}
                    <div>
                      <Label>
                        Brand Keywords
                        <InfoHoverCard info={infoContent["brandKeywords"]} />
                      </Label>
                      <TagInput
                        value={formData.brandKeywords}
                        onChange={(tags) => handleChange("brandKeywords", tags)}
                        placeholder="Type a keyword and hit enter"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Your Audience */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {/* Primary Audience (TagInput with suggestions) */}
                    <div>
                      <Label>
                        Primary Audience
                        <InfoHoverCard info={infoContent["primaryAudience"]} />
                      </Label>
                      <TagInput
                        value={formData.primaryAudience}
                        onChange={(tags) =>
                          handleChange("primaryAudience", tags)
                        }
                        placeholder="Add audience segments"
                        suggestions={audienceSuggestions}
                      />
                    </div>
                    {/* Demographics (optional) */}
                    <div>
                      <Label htmlFor="audienceDemographics">
                        Audience Demographics (optional)
                      </Label>
                      <Textarea
                        id="audienceDemographics"
                        value={formData.audienceDemographics}
                        onChange={(e) =>
                          handleChange("audienceDemographics", e.target.value)
                        }
                        placeholder="Age, gender, geography, etc."
                      />
                    </div>
                    {/* Pain Points (TagInput with suggestions) */}
                    <div>
                      <Label>
                        Customer Pain Points
                        <InfoHoverCard info={infoContent["painPoints"]} />
                      </Label>
                      <TagInput
                        value={formData.painPoints}
                        onChange={(tags) => handleChange("painPoints", tags)}
                        placeholder="Add pain points"
                        suggestions={painPointSuggestions}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Your Uniqueness */}
                {currentStep === 5 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {/* Differentiators (TagInput with examples) */}
                    <div>
                      <Label>
                        Unique Differentiators
                        <InfoHoverCard info={infoContent["differentiators"]} />
                      </Label>
                      <TagInput
                        value={formData.differentiators}
                        onChange={(tags) =>
                          handleChange("differentiators", tags)
                        }
                        placeholder="What sets you apart?"
                        suggestions={[
                          "Lifetime warranty",
                          "Handmade",
                          "Carbon-neutral shipping",
                          "Patent-pending",
                          "24/7 support",
                        ]}
                      />
                    </div>
                    {/* Social Proof Points (optional) */}
                    <div>
                      <Label htmlFor="socialProofPoints">
                        Social Proof / Recognition (optional)
                      </Label>
                      <Input
                        id="socialProofPoints"
                        value={formData.socialProofPoints}
                        onChange={(e) =>
                          handleChange("socialProofPoints", e.target.value)
                        }
                        placeholder="e.g. 10,000+ 5-star reviews, featured on Forbes"
                      />
                    </div>
                    {/* Unique Selling Proposition (optional) */}
                    <div>
                      <Label htmlFor="uniqueSellingProposition">
                        Unique Selling Proposition (optional)
                      </Label>
                      <Textarea
                        id="uniqueSellingProposition"
                        value={formData.uniqueSellingProposition}
                        onChange={(e) =>
                          handleChange(
                            "uniqueSellingProposition",
                            e.target.value
                          )
                        }
                        placeholder="Summarize your main value in one sentence"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 6: Marketing Setup */}
                {currentStep === 6 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {/* Preferred Channels (checkbox multi-select) */}
                    <div>
                      <Label>
                        Preferred Marketing Channels
                        <InfoHoverCard info={infoContent["channels"]} />
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {marketingChannels.map((ch) => (
                          <Button
                            type="button"
                            key={ch.value}
                            variant={
                              formData.preferredChannels.includes(ch.value)
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              toggleArrayValue("preferredChannels", ch.value)
                            }
                            className="flex items-center gap-2"
                          >
                            <span>{ch.icon}</span>
                            {ch.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                    {/* Average Order Value (optional) */}
                    <div>
                      <Label htmlFor="averageOrderValue">
                        Average Order Value (optional)
                      </Label>
                      <Input
                        id="averageOrderValue"
                        value={formData.averageOrderValue}
                        onChange={(e) =>
                          handleChange("averageOrderValue", e.target.value)
                        }
                        placeholder={`e.g. ${getCurrencySymbol()}50`}
                        type="number"
                        min="0"
                      />
                    </div>
                    {/* Top Products (TagInput, optional) */}
                    <div>
                      <Label htmlFor="topProducts">
                        Top Products (optional)
                      </Label>
                      <TagInput
                        value={formData.topProducts}
                        onChange={(tags) => handleChange("topProducts", tags)}
                        placeholder="Add top-selling products"
                      />
                    </div>
                    {/* Primary CTA */}
                    <div>
                      <Label htmlFor="primaryCTA">Primary Call-To-Action</Label>
                      <Input
                        id="primaryCTA"
                        value={formData.primaryCTA}
                        onChange={(e) =>
                          handleChange("primaryCTA", e.target.value)
                        }
                        placeholder="e.g. Shop Now"
                        required
                      />
                    </div>
                    {/* Shipping Policy (optional) */}
                    <div>
                      <Label htmlFor="shippingPolicy">
                        Shipping Policy (optional)
                      </Label>
                      <Textarea
                        id="shippingPolicy"
                        value={formData.shippingPolicy}
                        onChange={(e) =>
                          handleChange("shippingPolicy", e.target.value)
                        }
                        placeholder="e.g. Free shipping over $50"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={currentStep === 1 || loading}
                    onClick={handleBack}
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                  {currentStep < steps.length ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!isStepValid() || loading}
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      // loading={loading ? 1 : 0}
                      disabled={!isStepValid() || loading}
                    >
                      Finish
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
