// components/onboarding/steps/brand-voice.tsx
import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InfoHoverCard } from "@/components/onboarding/onboarding-infoHoverCard";
import { TagInput } from "@/components/onboarding/onboarding-tagInput";
import {
  brandTones,
  coreValuesOptions,
  infoContent,
} from "@/lib/constants/onboarding";

interface StepThreeBrandVoiceProps {
  formData: {
    brandTone: string;
    brandToneSample: string;
    coreValues: string[];
    brandKeywords: string[];
  };
  handleChange: (name: string, value: any) => void;
  toggleArrayValue: (arrayName: string, value: string) => void;
}

export function StepThreeBrandVoice({
  formData,
  handleChange,
  toggleArrayValue,
}: StepThreeBrandVoiceProps) {
  return (
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
              variant={formData.brandTone === tone.value ? "default" : "outline"}
              onClick={() => handleChange("brandTone", tone.value)}
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
            {brandTones.find((t) => t.value === formData.brandTone)?.desc}
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
          onChange={(e) => handleChange("brandToneSample", e.target.value)}
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
                formData.coreValues.includes(v.value) ? "default" : "outline"
              }
              onClick={() => toggleArrayValue("coreValues", v.value)}
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
  );
}