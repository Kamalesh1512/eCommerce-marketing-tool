import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Zap, FolderOpen, Sparkles } from "lucide-react";

export function DashboardQuickTips() {
  return (
    <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-purple-500/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle>Pro Tips for Maximum Impact</CardTitle>
            <CardDescription>
              Get the most out of your AI-generated content
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: Target,
              title: "Start with Headlines",
              text: "Your headline is 80% of your copy. Use the Headline Generator first.",
            },
            {
              icon: Zap,
              title: "Features → Benefits",
              text: "Convert technical features into customer benefits with the Benefit Bullets tool.",
            },
            {
              icon: FolderOpen,
              title: "Scale with Batch",
              text: "Generate content for your entire catalog at once using batch processing.",
            },
          ].map((tip, i) => (
            <div key={i} className="p-4 rounded-lg bg-card/50 border border-border/50">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <tip.icon className="w-4 h-4 text-primary" />
                {tip.title}
              </h4>
              <p className="text-sm text-muted-foreground">{tip.text}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
