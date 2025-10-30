// components/onboarding/tag-input.tsx
import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder: string;
  suggestions?: string[];
}

export function TagInput({
  value,
  onChange,
  placeholder,
  suggestions,
}: TagInputProps) {
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
}