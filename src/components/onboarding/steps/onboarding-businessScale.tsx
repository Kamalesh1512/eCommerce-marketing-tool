// components/onboarding/steps/step-two-business-scale.tsx
import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  currencies,
  revenueBrackets,
  platforms,
  infoContent,
} from "@/lib/constants/onboarding";
import { InfoHoverCard } from "../onboarding-infoHoverCard";
import { MultiSelectCountries } from "../onboarding-selectCountries";

interface StepTwoBusinessScaleProps {
  formData: {
    currency: string;
    revenueBracket: string;
    platform: string;
    targetMarketLocation: string[];
  };
  handleChange: (name: string, value: any) => void;
}

export function StepTwoBusinessScale({
  formData,
  handleChange,
}: StepTwoBusinessScaleProps) {
  return (
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
          onValueChange={(val) => handleChange("revenueBracket", val)}
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
        <MultiSelectCountries
          value={formData.targetMarketLocation}
          onChange={(markets) => handleChange("targetMarketLocation", markets)}
        />
      </div>
    </motion.div>
  );
}