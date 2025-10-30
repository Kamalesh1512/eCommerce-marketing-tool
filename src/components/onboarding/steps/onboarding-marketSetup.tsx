import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { InfoHoverCard } from "@/components/onboarding/onboarding-infoHoverCard";
import { TagInput } from "@/components/onboarding/onboarding-tagInput"
import { infoContent, marketingChannels } from "@/lib/constants/onboarding";

interface MarketingSetupProps {
  formData: {
    preferredChannels: string[];
    averageOrderValue: string;
    topProducts: string[];
    primaryCTA: string;
    shippingPolicy: string;
    currency: string;
  };
  onUpdate: (name: string, value: any) => void;
  onToggleArrayValue: (arrayName: string, value: string) => void;
  getCurrencySymbol: () => string;
}

export const MarketingSetup: React.FC<MarketingSetupProps> = ({
  formData,
  onUpdate,
  onToggleArrayValue,
  getCurrencySymbol,
}) => {
  return (
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
              onClick={() => onToggleArrayValue("preferredChannels", ch.value)}
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
          onChange={(e) => onUpdate("averageOrderValue", e.target.value)}
          placeholder={`e.g. ${getCurrencySymbol()}50`}
          type="number"
          min="0"
        />
      </div>

      {/* Top Products (TagInput, optional) */}
      <div>
        <Label htmlFor="topProducts">Top Products (optional)</Label>
        <TagInput
          value={formData.topProducts}
          onChange={(tags) => onUpdate("topProducts", tags)}
          placeholder="Add top-selling products"
        />
      </div>

      {/* Primary CTA */}
      <div>
        <Label htmlFor="primaryCTA">Primary Call-To-Action</Label>
        <Input
          id="primaryCTA"
          value={formData.primaryCTA}
          onChange={(e) => onUpdate("primaryCTA", e.target.value)}
          placeholder="e.g. Shop Now"
          required
        />
      </div>

      {/* Shipping Policy (optional) */}
      <div>
        <Label htmlFor="shippingPolicy">Shipping Policy (optional)</Label>
        <Textarea
          id="shippingPolicy"
          value={formData.shippingPolicy}
          onChange={(e) => onUpdate("shippingPolicy", e.target.value)}
          placeholder="e.g. Free shipping over $50"
        />
      </div>
    </motion.div>
  );
};