// src/components/tools/shared/UniversalToolForm.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { ModelSelector } from "@/components/tools/shared/modelSelector";
import {
  TextField,
  TextAreaField,
  SelectField,
  ArrayField,
} from "@/components/tools/shared/formFields";
import { ToolConfig, ToolField } from "@/lib/tools/types";
import { useBrandProfile } from "@/hooks/use-brandProfile";

interface UniversalToolFormProps {
  config: ToolConfig;
  onSubmit: (inputs: Record<string, any>) => void;
  loading: boolean;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

export function UniversalToolForm({
  config,
  onSubmit,
  loading,
  selectedModel,
  setSelectedModel,
}: UniversalToolFormProps) {
  const {
    brandProfile,
    loading: brandLoading,
    getSuggestion,
  } = useBrandProfile();

  // Initialize form state from config fields
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    config.fields.forEach((field) => {
      if (field.type === "array") {
        initial[field.id] = field.defaultValue || [];
      } else {
        initial[field.id] = field.defaultValue || "";
      }
    });
    return initial;
  });

  useEffect(() => {
    setFormData((prev) => {
      const updated = { ...prev };
      config.fields.forEach((field) => {
        if (
          field.type === "select" &&
          (updated[field.id] === "" || updated[field.id] == null)
        ) {
          updated[field.id] = field.options?.[0]?.value || "";
        }
      });
      return updated;
    });
  }, [config]);

  // Track which fields have active suggestions
  const [activeSuggestions, setActiveSuggestions] = useState<
    Record<string, boolean>
  >({});

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleApplySuggestion = (fieldId: string) => {
    const suggestion = getSuggestion(config.id as any, fieldId);

    if (suggestion !== undefined && suggestion !== "") {
      handleFieldChange(fieldId, suggestion);

      // Flash the suggestion button to indicate success
      setActiveSuggestions((prev) => ({ ...prev, [fieldId]: true }));
      setTimeout(() => {
        setActiveSuggestions((prev) => ({ ...prev, [fieldId]: false }));
      }, 1000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderField = (field: ToolField) => {
    const hasBrandProfile = !!brandProfile;
    const suggestion = hasBrandProfile
      ? getSuggestion(config.id as any, field.id)
      : null;
    const hasSuggestion =
      suggestion !== undefined && suggestion !== "" && suggestion !== null;

    const commonProps = {
      id: field.id,
      label: field.label,
      description: field.description,
      example: field.example,
      required: field.required,
      placeholder: field.placeholder,
      suggestion: hasSuggestion ? suggestion : null,
      onApplySuggestion: hasSuggestion
        ? () => handleApplySuggestion(field.id)
        : undefined,
      loading: brandLoading || activeSuggestions[field.id],
    };

    switch (field.type) {
      case "text":
        return (
          <TextField
            key={field.id}
            {...commonProps}
            value={formData[field.id] || ""}
            onChange={(value) => handleFieldChange(field.id, value)}
          />
        );

      case "textarea":
        return (
          <TextAreaField
            key={field.id}
            {...commonProps}
            value={formData[field.id] || ""}
            onChange={(value) => handleFieldChange(field.id, value)}
            rows={field.rows}
          />
        );

      case "select":
        const defaultValue =
          formData[field.id] === "" || formData[field.id] == null
            ? field.options?.[0]?.value
            : formData[field.id];
        return (
          <SelectField
            key={field.id}
            {...commonProps}
            value={defaultValue}
            onChange={(value) => handleFieldChange(field.id, value)}
            options={field.options}
          />
        );

      case "array":
        return (
          <ArrayField
            key={field.id}
            {...commonProps}
            values={formData[field.id] || []}
            onChange={(values) => handleFieldChange(field.id, values)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Brand Profile Notice */}
      {brandProfile && (
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-medium text-primary">
              Brand Profile Loaded
            </span>
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            Click "Use suggestion" buttons to auto-fill fields from your brand
            profile.
          </p>
        </div>
      )}

      {/* Dynamic Fields */}
      {config.fields.map((field) => renderField(field))}

      {/* AI Model Selection */}
      {/* <ModelSelector
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      /> */}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-12 text-base font-semibold"
        disabled={loading}
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Generate {config.name}
          </>
        )}
      </Button>
    </form>
  );
}
