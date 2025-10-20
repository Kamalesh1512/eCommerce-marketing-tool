"use client";

import React from "react";
import { Info } from "lucide-react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

type InfoItem = {
  title: string;
  content: string;
  examples?: string[];
};

type InfoHoverCardProps = {
  info: InfoItem;
};

export const InfoHoverCard: React.FC<InfoHoverCardProps> = ({ info }) => {
  return (
    <HoverCard openDelay={150} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          <Info className="w-3.5 h-3.5 text-primary" />
        </button>
      </HoverCardTrigger>

      <HoverCardContent className="w-80 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Info className="w-4 h-4 text-primary" />
          </div>
          <h4 className="font-semibold text-foreground">{info.title}</h4>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {info.content}
        </p>

        {info.examples && info.examples.length > 0 && (
          <div className="mt-2">
            <h5 className="text-xs font-medium text-foreground mb-1">
              Examples:
            </h5>
            <ul className="space-y-1">
              {info.examples.map((ex, i) => (
                <li
                  key={i}
                  className="text-xs text-muted-foreground bg-muted p-2 rounded-md"
                >
                  {ex}
                </li>
              ))}
            </ul>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};
