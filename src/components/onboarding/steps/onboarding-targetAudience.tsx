// components/onboarding/steps/step-four-audience.tsx
import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { InfoHoverCard } from "@/components/onboarding/onboarding-infoHoverCard";
import { TagInput } from "@/components/onboarding/onboarding-tagInput";
import {
  audienceSuggestions,
  painPointSuggestions,
  infoContent,
} from "@/lib/constants/onboarding";

interface StepFourAudienceProps {
  formData: {
    primaryAudience: string[];
    audienceDemographics: string;
    painPoints: string[];
  };
  handleChange: (name: string, value: any) => void;
}

export function StepFourAudience({
  formData,
  handleChange,
}: StepFourAudienceProps) {
  return (
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
          onChange={(tags) => handleChange("primaryAudience", tags)}
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
          onChange={(e) => handleChange("audienceDemographics", e.target.value)}
          placeholder="Age, gender, geography, etc."
        />
      </div>

      {/* Pain Points (TagInput with suggestions) */}
      {/* <div>
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
      </div> */}
    </motion.div>
  );
}