// components/onboarding/multi-select-countries.tsx
import React from "react";
import { X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { countries } from "@/lib/constants/onboarding";

interface MultiSelectCountriesProps {
  value: string[];
  onChange: (markets: string[]) => void;
}

export function MultiSelectCountries({
  value,
  onChange,
}: MultiSelectCountriesProps) {
  const toggleCountry = (countryValue: string) => {
    if (countryValue === "global") {
      onChange(["global"]);
    } else {
      const filtered = value.filter((m) => m !== "global");
      const newMarkets = filtered.includes(countryValue)
        ? filtered.filter((m) => m !== countryValue)
        : [...filtered, countryValue];
      onChange(newMarkets);
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
              checked={value.includes(country.value)}
              onCheckedChange={() => toggleCountry(country.value)}
            />
            <label className="text-sm cursor-pointer flex-1">
              {country.label}
            </label>
          </div>
        ))}
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {value.map((market) => {
            const country = countries.find((c) => c.value === market);
            return (
              <Badge key={market} variant="secondary" className="pl-3 pr-1 py-1">
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
}