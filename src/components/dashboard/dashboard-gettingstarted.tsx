"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardGettingStartedGuide() {
  const router = useRouter();

  const steps = [
    {
      title: "Complete your brand profile",
      description: "Help us understand your brand voice, audience, and value proposition",
    },
    {
      title: "Start with the Headline Generator",
      description: "Create irresistible offers that grab attention and communicate value instantly",
    },
    {
      title: "Generate product descriptions",
      description: "Transform boring feature lists into compelling stories that sell",
    },
    {
      title: "Scale with batch processing",
      description: "Upload a CSV to generate content for your entire product catalog",
    },
  ];

  return (
    <Card className="border-2 border-dashed border-border/50 bg-muted/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          First Time Here?
        </CardTitle>
        <CardDescription>
          Follow these steps to start generating high-converting content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <p className="font-medium">{step.title}</p>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Button
          className="w-full mt-6 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
          onClick={() => router.push("/tools/headline-generator")}
        >
          Get Started Now
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
