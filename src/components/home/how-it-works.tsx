'use client'
import { useState } from "react";
import { motion } from "framer-motion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { SolutionPoint } from "../animation/solution-point";
import { Badge } from "../ui/badge";


// How It Works Section
export const HowItWorksSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("headlines");

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            How It Works
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            From Bland to Brand in 3 Steps
          </h2>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-12">
            <TabsTrigger value="headlines">Headlines</TabsTrigger>
            <TabsTrigger value="descriptions">Descriptions</TabsTrigger>
            <TabsTrigger value="ads">Ads</TabsTrigger>
          </TabsList>

          <TabsContent value="headlines" className="space-y-8">
            <Card className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        1
                      </div>
                      <h3 className="text-xl font-semibold">Input Your Product</h3>
                    </div>
                    <p className="text-muted-foreground pl-11">
                      Tell us about your product, target customer, and the problem you solve
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        2
                      </div>
                      <h3 className="text-xl font-semibold">AI Architects Your Offer</h3>
                    </div>
                    <p className="text-muted-foreground pl-11">
                      Our system combines benefits, social proof, and urgency into compelling offers
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        3
                      </div>
                      <h3 className="text-xl font-semibold">Pick & Deploy</h3>
                    </div>
                    <p className="text-muted-foreground pl-11">
                      Choose from 5-10 variations and watch your conversion rates soar
                    </p>
                  </div>
                </div>

                <div className="space-y-4 bg-muted p-6 rounded-lg">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Before:</p>
                    <p className="text-lg opacity-60">"Durable Aluminium Wallet"</p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-sm text-primary font-semibold">After:</p>
                    <p className="text-lg font-semibold">
                      "The Last Wallet You'll Ever Own: The Slim Aluminium Wallet for the Modern Minimalist"
                    </p>
                    <p className="text-lg font-semibold">
                      "Finally, A Slim Wallet That Holds Everything Without The Bulk. Guaranteed For Life."
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="descriptions" className="space-y-8">
            <Card className="p-8">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground">
                  Our automated storyteller transforms boring feature lists into narratives that sell dream outcomes:
                </p>
                <div className="grid gap-4">
                  {[
                    "Aspirational Hook: Set the scene with who this is for",
                    "Problem Agitation: Remind them of their pain points",
                    "Solution Introduction: Position your product as the answer",
                    "Benefit-Driven Features: Show how each feature solves their problems"
                  ].map((step, i) => (
                    <SolutionPoint key={i} text={step} index={i} />
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="ads" className="space-y-8">
            <Card className="p-8">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground">
                  Create scroll-stopping ads optimized for Facebook and Instagram's competitive environment:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4 p-4 border rounded-lg">
                    <Badge>Problem-Agitate-Solve</Badge>
                    <p className="text-sm leading-relaxed">
                      "That nagging 'did someone just brush my pocket?' feeling can ruin a perfect travel day. We designed the Nomad Backpack with a hidden anti-theft pocket so you can finally enjoy the moment..."
                    </p>
                  </div>
                  <div className="space-y-4 p-4 border rounded-lg">
                    <Badge>Direct-to-Benefit</Badge>
                    <p className="text-sm leading-relaxed">
                      "Travel smarter, not harder. The Nomad Backpack combines sleek design with brilliant features like an anti-theft pocket and on-the-go USB charging..."
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
