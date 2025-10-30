// components/onboarding/steps/step-five-uniqueness.tsx
import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InfoHoverCard } from "@/components/onboarding/onboarding-infoHoverCard";
import { TagInput } from "@/components/onboarding/onboarding-tagInput";
import { infoContent } from "@/lib/constants/onboarding";

interface StepFiveUniquenessProps {
  formData: {
    differentiators: string[];
    socialProofPoints: string;
    uniqueSellingProposition: string;
  };
  handleChange: (name: string, value: any) => void;
}

export function StepFiveUniqueness({
  formData,
  handleChange,
}: StepFiveUniquenessProps) {
  return (
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
          onChange={(tags) => handleChange("differentiators", tags)}
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
          onChange={(e) => handleChange("socialProofPoints", e.target.value)}
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
            handleChange("uniqueSellingProposition", e.target.value)
          }
          placeholder="Summarize your main value in one sentence"
        />
      </div>
    </motion.div>
  );
}