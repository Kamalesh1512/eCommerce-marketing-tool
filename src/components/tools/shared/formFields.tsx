//src/components/tools/shared/formFields
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Info, Wand2, Loader2, Plus, X } from "lucide-react";
import { useState } from "react";

// ========================================
// Field Info Tooltip
// ========================================
interface FieldInfoProps {
  title: string;
  description: string;
  example?: string;
}

export function FieldInfo({ title, description, example }: FieldInfoProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Info className="w-4 h-4 text-muted-foreground hover:text-primary cursor-help transition-colors" />
      </HoverCardTrigger>
      <HoverCardContent className="w-80" align="start">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
          {example && (
            <div className="pt-2 border-t">
              <p className="text-xs font-medium text-muted-foreground mb-1">Example:</p>
              <p className="text-xs italic">{example}</p>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

// ========================================
// Suggestion Button
// ========================================
interface SuggestionButtonProps {
  onClick: () => void;
  loading: boolean;
}

export function SuggestionButton({ onClick, loading }: SuggestionButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={loading}
      className="h-8 gap-1 text-xs"
    >
      {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
      Use suggestion
    </Button>
  );
}

// ========================================
// Generic Text Input Field
// ========================================
interface TextFieldProps {
  id: string;
  label: string;
  description: string;
  example?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  suggestion?: string | string[] | Record<string, any> | null;
  onApplySuggestion?: () => void;
  loading?: boolean;
  placeholder?: string;
}

export function TextField({
  id,
  label,
  description,
  example,
  required,
  value,
  onChange,
  suggestion,
  onApplySuggestion,
  loading,
  placeholder,
}: TextFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label htmlFor={id}>
            {label}
            {required && <span className="text-red-500">*</span>}
          </Label>
          <FieldInfo title={label} description={description} example={example} />
        </div>
        {suggestion && onApplySuggestion && (
          <SuggestionButton onClick={onApplySuggestion} loading={!!loading} />
        )}
      </div>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || description}
        className="h-11"
        required={required}
      />
    </div>
  );
}

// ========================================
// Generic Textarea Field
// ========================================
interface TextAreaFieldProps {
  id: string;
  label: string;
  description: string;
  example?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  suggestion?: string | string[] | Record<string, any> | null;
  onApplySuggestion?: () => void;
  loading?: boolean;
  rows?: number;
  placeholder?: string;
}

export function TextAreaField({
  id,
  label,
  description,
  example,
  required,
  value,
  onChange,
  suggestion,
  onApplySuggestion,
  loading,
  rows = 3,
  placeholder,
}: TextAreaFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label htmlFor={id}>
            {label}
            {required && <span className="text-red-500">*</span>}
          </Label>
          <FieldInfo title={label} description={description} example={example} />
        </div>
        {suggestion && onApplySuggestion && (
          <SuggestionButton onClick={onApplySuggestion} loading={!!loading} />
        )}
      </div>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || description}
        rows={rows}
        className="resize-none"
        required={required}
      />
    </div>
  );
}

// ========================================
// Generic Select Field
// ========================================
interface SelectFieldProps {
  id: string;
  label: string;
  description: string;
  example?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string; description?: string }>;
  suggestion?: string | string[] | Record<string, any> | null;
  onApplySuggestion?: () => void;
  loading?: boolean;
}

export function SelectField({
  id,
  label,
  description,
  example,
  required,
  value,
  onChange,
  options,
  suggestion,
  onApplySuggestion,
  loading,
}: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label htmlFor={id}>
            {label}
            {required && <span className="text-red-500">*</span>}
          </Label>
          <FieldInfo title={label} description={description} example={example} />
        </div>
        {suggestion && onApplySuggestion && (
          <SuggestionButton onClick={onApplySuggestion} loading={!!loading} />
        )}
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-11">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex flex-col">
                <span>{option.label}</span>
                {option.description && (
                  <span className="text-xs text-muted-foreground">{option.description}</span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// ========================================
// Generic Array/Tags Field (for features, etc.)
// ========================================
interface ArrayFieldProps {
  id: string;
  label: string;
  description: string;
  example?: string;
  required?: boolean;
  values: string[];
  onChange: (values: string[]) => void;
  suggestion?: string | string[] | Record<string, any> | null;
  onApplySuggestion?: () => void;
  loading?: boolean;
  placeholder?: string;
}

export function ArrayField({
  id,
  label,
  description,
  example,
  required,
  values,
  onChange,
  suggestion,
  onApplySuggestion,
  loading,
  placeholder,
}: ArrayFieldProps) {
  const [newValue, setNewValue] = useState("");

  const addValue = () => {
    if (newValue.trim()) {
      onChange([...values, newValue.trim()]);
      setNewValue("");
    }
  };

  const removeValue = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label htmlFor={id}>
            {label}
            {required && <span className="text-red-500">*</span>}
          </Label>
          <FieldInfo title={label} description={description} example={example} />
        </div>
        {suggestion && Array.isArray(suggestion) && suggestion.length > 0 && onApplySuggestion && (
          <SuggestionButton onClick={onApplySuggestion} loading={!!loading} />
        )}
      </div>

      {/* Display existing values */}
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {values.map((value, index) => (
            <Badge key={index} variant="secondary" className="gap-1 pr-1">
              {value}
              <button
                type="button"
                onClick={() => removeValue(index)}
                className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Add new value */}
      <div className="flex gap-2">
        <Input
          id={id}
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder={placeholder || description}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addValue();
            }
          }}
          className="h-10"
        />
        <Button type="button" onClick={addValue} size="sm" variant="outline">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {required && values.length === 0 && (
        <p className="text-xs text-destructive">At least one item is required</p>
      )}
    </div>
  );
}