// components/onboarding/steps/business-basics.tsx
import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InfoHoverCard } from "@/components/onboarding/onboarding-infoHoverCard";
import { brandCategories, infoContent } from "@/lib/constants/onboarding";

interface StepOneBusinessBasicsProps {
  formData: {
    companyName: string;
    websiteUrl: string;
    brandCategory: string;
    skusCount: string | number;
  };
  handleChange: (name: string, value: any) => void;
}

export function StepOneBusinessBasics({
  formData,
  handleChange,
}: StepOneBusinessBasicsProps) {
  return (
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
            onChange={(e) => handleChange("companyName", e.target.value)}
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
          onValueChange={(val) => handleChange("brandCategory", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent>
            {brandCategories.map((cat) => (
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
          onChange={(e) => handleChange("websiteUrl", e.target.value)}
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
          onChange={(e) => handleChange("skusCount", Number(e.target.value))}
          placeholder="e.g. 25"
          className="mt-1"
          autoComplete="off"
          min={0}
        />
      </div>
    </motion.div>
  );
}