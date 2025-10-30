'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Target, Mail, CheckCircle2, ArrowRight, TrendingUp } from "lucide-react";

const StepIndicator = ({ number, active }: { number: number; active?: boolean }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: number * 0.1 }}
    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
      active 
        ? 'bg-gradient-to-br from-primary to-primary/60 text-primary-foreground shadow-lg' 
        : 'bg-primary text-primary-foreground'
    }`}
  >
    {number}
  </motion.div>
);

const FeaturePoint = ({ text, index }: { text: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
  >
    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
    <p className="text-sm leading-relaxed">{text}</p>
  </motion.div>
);

const BeforeAfterCard = ({ before, after, type = "single" }: { before: string; after: string | string[]; type?: "single" | "multiple" }) => (
  <div className="space-y-4 bg-gradient-to-br from-muted/50 to-muted/30 p-6 rounded-xl border shadow-sm">
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500"></div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Before</p>
      </div>
      <p className="text-base opacity-60 line-through">{before}</p>
    </div>
    <Separator />
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
        <p className="text-xs font-semibold text-primary uppercase tracking-wider">After</p>
      </div>
      {type === "single" ? (
        <p className="text-base font-semibold leading-relaxed">{after as string}</p>
      ) : (
        <div className="space-y-2">
          {(after as string[]).map((item, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="text-base font-semibold leading-relaxed"
            >
              {item}
            </motion.p>
          ))}
        </div>
      )}
    </div>
  </div>
);

export const HowItWorksSection = () => {
  const [activeTab, setActiveTab] = useState("headlines");

  const tools = [
    {
      id: "headlines",
      label: "Headlines",
      icon: Sparkles,
      color: "text-purple-500"
    },
    {
      id: "descriptions",
      label: "Descriptions",
      icon: Target,
      color: "text-blue-500"
    },
    {
      id: "bullets",
      label: "Benefit Bullets",
      icon: CheckCircle2,
      color: "text-green-500"
    },
    {
      id: "ads",
      label: "Ad Copy",
      icon: TrendingUp,
      color: "text-orange-500"
    },
    {
      id: "emails",
      label: "Email Lines",
      icon: Mail,
      color: "text-pink-500"
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1.5">
            <Zap className="w-3 h-3 mr-2 inline" />
            How It Works
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            From Bland to Brand in 3 Steps
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Five powerful tools working together to transform every touchpoint of your customer journey
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 max-w-4xl mx-auto mb-12 h-auto p-1 bg-muted/50">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <TabsTrigger 
                  key={tool.id} 
                  value={tool.id}
                  className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-background"
                >
                  <Icon className={`w-5 h-5 ${activeTab === tool.id ? tool.color : 'text-muted-foreground'}`} />
                  <span className="text-xs font-medium">{tool.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* HEADLINES */}
              <TabsContent value="headlines" className="space-y-8 mt-0">
                <Card className="p-8 border-2 shadow-xl">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-8">
                      <div>
                        <Badge className="mb-3 bg-purple-500/10 text-purple-500 hover:bg-purple-500/20">
                          Unbeatable Offer Headline Generator
                        </Badge>
                        <h3 className="text-2xl font-bold mb-3">Turn Boring Headlines Into Irresistible Offers</h3>
                        <p className="text-muted-foreground">
                          The headline is the single most important piece of copy. If it doesn't grab attention, nothing else matters.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <StepIndicator number={1} />
                          <div className="flex-1 pt-1">
                            <h4 className="font-semibold text-lg mb-1">Input Your Product</h4>
                            <p className="text-sm text-muted-foreground">
                              Tell us your product name, target customer, main benefits, and what makes you different
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <StepIndicator number={2} />
                          <div className="flex-1 pt-1">
                            <h4 className="font-semibold text-lg mb-1">AI Architects Your Offer</h4>
                            <p className="text-sm text-muted-foreground">
                              Our system combines benefits, social proof, and urgency into compelling offers
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <StepIndicator number={3} />
                          <div className="flex-1 pt-1">
                            <h4 className="font-semibold text-lg mb-1">Pick Your Winner</h4>
                            <p className="text-sm text-muted-foreground">
                              Get 5-10 variations with our top recommendation and deploy instantly
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:border-l lg:pl-8">
                      <BeforeAfterCard
                        before="Durable Aluminum Wallet"
                        after={[
                          "The Last Wallet You'll Ever Own: The Slim Aluminum Wallet for the Modern Minimalist",
                          "Finally, A Slim Wallet That Holds Everything Without The Bulk. Guaranteed For Life."
                        ]}
                        type="multiple"
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* DESCRIPTIONS */}
              <TabsContent value="descriptions" className="space-y-8 mt-0">
                <Card className="p-8 border-2 shadow-xl">
                  <div className="space-y-8">
                    <div>
                      <Badge className="mb-3 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                        High-Converting Description Generator
                      </Badge>
                      <h3 className="text-2xl font-bold mb-3">Transform Features Into Emotional Stories</h3>
                      <p className="text-muted-foreground mb-6">
                        Stop writing boring product descriptions that read like user manuals. Our AI weaves your features into compelling narratives that sell the dream outcome.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold flex items-center gap-2">
                          <ArrowRight className="w-4 h-4 text-blue-500" />
                          The Narrative Structure
                        </h4>
                        <FeaturePoint text="Aspirational Hook: Set the scene with who this is for" index={0} />
                        <FeaturePoint text="Problem Agitation: Remind them of their pain points" index={1} />
                        <FeaturePoint text="Solution Introduction: Position your product as the answer" index={2} />
                        <FeaturePoint text="Benefit-Driven Features: Show how each feature solves problems" index={3} />
                      </div>

                      <div className="space-y-4 p-6 bg-gradient-to-br from-blue-500/5 to-blue-500/10 rounded-xl border border-blue-500/20">
                        <Badge variant="outline" className="mb-2">Example Output</Badge>
                        <div className="space-y-3 text-sm leading-relaxed">
                          <p className="font-semibold text-blue-600">For the modern adventurer who demands style and security.</p>
                          <p className="text-muted-foreground">Tired of worrying about sudden downpours soaking your tech or pickpockets in crowded stations?</p>
                          <p>The Nomad Backpack was designed from the ground up to be your trusted companion on every journey.</p>
                          <div className="space-y-2 pt-2">
                            <p className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                              <span><strong>Conquer Any Weather:</strong> Waterproof canvas keeps your gear bone-dry</span>
                            </p>
                            <p className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                              <span><strong>Travel with Peace of Mind:</strong> Hidden anti-theft pocket secures valuables</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="flex-1 text-center p-3 bg-background rounded-lg border">
                        <p className="text-xs text-muted-foreground mb-1">Choose Length</p>
                        <p className="font-semibold">150 / 300 / 500+ words</p>
                      </div>
                      <div className="flex-1 text-center p-3 bg-background rounded-lg border">
                        <p className="text-xs text-muted-foreground mb-1">Select Tone</p>
                        <p className="font-semibold">Professional • Casual • Luxury</p>
                      </div>
                      <div className="flex-1 text-center p-3 bg-background rounded-lg border">
                        <p className="text-xs text-muted-foreground mb-1">Get Results</p>
                        <p className="font-semibold">2-3 variations + score</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* BENEFIT BULLETS */}
              <TabsContent value="bullets" className="space-y-8 mt-0">
                <Card className="p-8 border-2 shadow-xl">
                  <div className="space-y-8">
                    <div>
                      <Badge className="mb-3 bg-green-500/10 text-green-500 hover:bg-green-500/20">
                        Benefit Bullets Converter
                      </Badge>
                      <h3 className="text-2xl font-bold mb-3">Translate Features Into Benefits That Sell</h3>
                      <p className="text-muted-foreground">
                        Customers don't buy features—they buy outcomes. This tool translates "what it is" into "what it does for you."
                      </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="p-5 bg-red-500/5 border border-red-500/20 rounded-lg">
                          <Badge variant="outline" className="mb-3 text-red-600 border-red-300">Feature (Boring)</Badge>
                          <p className="text-lg">"100% Waterproof Fabric"</p>
                        </div>
                        <div className="flex justify-center">
                          <ArrowRight className="w-6 h-6 text-green-500 rotate-90 lg:rotate-0" />
                        </div>
                        <div className="p-5 bg-green-500/5 border border-green-500/20 rounded-lg">
                          <Badge variant="outline" className="mb-3 text-green-600 border-green-300">Benefit (Compelling)</Badge>
                          <p className="text-lg font-semibold leading-relaxed">
                            ✓ Never Worry About The Rain Again: Our 100% waterproof fabric means your valuables stay bone-dry, whether you're caught in a downpour or spill your morning coffee.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-5 bg-red-500/5 border border-red-500/20 rounded-lg">
                          <Badge variant="outline" className="mb-3 text-red-600 border-red-300">Feature (Boring)</Badge>
                          <p className="text-lg">"Made with Titanium"</p>
                        </div>
                        <div className="flex justify-center">
                          <ArrowRight className="w-6 h-6 text-green-500 rotate-90 lg:rotate-0" />
                        </div>
                        <div className="p-5 bg-green-500/5 border border-green-500/20 rounded-lg">
                          <Badge variant="outline" className="mb-3 text-green-600 border-green-300">Benefit (Compelling)</Badge>
                          <p className="text-lg font-semibold leading-relaxed">
                            ✓ Built To Last A Lifetime: Forged from the same titanium used in aerospace, this is engineered to withstand anything you throw at it, so you'll never have to buy another one.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 rounded-xl border border-green-500/20">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-green-500" />
                        Automatic Enhancement
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        All your product features are automatically converted into benefit-driven bullets that connect with customer desires and solve their problems.
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* ADS */}
              <TabsContent value="ads" className="space-y-8 mt-0">
                <Card className="p-8 border-2 shadow-xl">
                  <div className="space-y-8">
                    <div>
                      <Badge className="mb-3 bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">
                        Stop The Scroll Ad Copy Creator
                      </Badge>
                      <h3 className="text-2xl font-bold mb-3">Create Scroll-Stopping Social Media Ads</h3>
                      <p className="text-muted-foreground">
                        The Facebook newsfeed is a war for attention. Most ads are invisible. Create copy that stops the scroll and drives clicks.
                      </p>
                    </div>

                    <div className="grid gap-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4 p-6 border-2 rounded-xl hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-500/5 to-purple-500/5">
                          <div className="flex items-center justify-between">
                            <Badge className="bg-blue-500">Problem-Agitate-Solve</Badge>
                            <span className="text-xs text-muted-foreground">Facebook Optimized</span>
                          </div>
                          <p className="text-sm leading-relaxed">
                            "That nagging 'did someone just brush my pocket?' feeling can ruin a perfect travel day. We designed the Nomad Backpack with a hidden anti-theft pocket so you can finally enjoy the moment..."
                          </p>
                          <div className="flex gap-2 text-xs text-muted-foreground">
                            <span className="px-2 py-1 bg-muted rounded">Hook</span>
                            <span className="px-2 py-1 bg-muted rounded">Agitate</span>
                            <span className="px-2 py-1 bg-muted rounded">Solve</span>
                          </div>
                        </div>

                        <div className="space-y-4 p-6 border-2 rounded-xl hover:shadow-lg transition-shadow bg-gradient-to-br from-pink-500/5 to-orange-500/5">
                          <div className="flex items-center justify-between">
                            <Badge className="bg-pink-500">Direct-to-Benefit</Badge>
                            <span className="text-xs text-muted-foreground">Instagram Optimized</span>
                          </div>
                          <p className="text-sm leading-relaxed">
                            "Travel smarter, not harder. The Nomad Backpack combines sleek design with brilliant features like an anti-theft pocket and on-the-go USB charging..."
                          </p>
                          <div className="flex gap-2 text-xs text-muted-foreground">
                            <span className="px-2 py-1 bg-muted rounded">Benefit</span>
                            <span className="px-2 py-1 bg-muted rounded">Features</span>
                            <span className="px-2 py-1 bg-muted rounded">CTA</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 p-6 bg-muted/50 rounded-lg">
                        <div className="space-y-2">
                          <h5 className="font-semibold text-sm">Choose Objective</h5>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <p>• Build Awareness</p>
                            <p>• Drive Traffic</p>
                            <p>• Drive Sales</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h5 className="font-semibold text-sm">Select Format</h5>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <p>• Single Image</p>
                            <p>• Carousel</p>
                            <p>• Video / Story</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h5 className="font-semibold text-sm">Add Promotion</h5>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <p>• Discount</p>
                            <p>• Bundle Deal</p>
                            <p>• Free Shipping</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* EMAILS */}
              <TabsContent value="emails" className="space-y-8 mt-0">
                <Card className="p-8 border-2 shadow-xl">
                  <div className="space-y-8">
                    <div>
                      <Badge className="mb-3 bg-pink-500/10 text-pink-500 hover:bg-pink-500/20">
                        Open Me Now Email Subject Line Engine
                      </Badge>
                      <h3 className="text-2xl font-bold mb-3">Boost Open Rates With Irresistible Subject Lines</h3>
                      <p className="text-muted-foreground">
                        Your email list is worthless if no one opens your emails. Generate subject lines based on proven psychological triggers.
                      </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold mb-4">Email Types Supported</h4>
                        <div className="grid gap-3">
                          {[
                            { type: "Abandoned Cart", desc: "Win back lost sales" },
                            { type: "Post-Purchase", desc: "Build relationships" },
                            { type: "Sale Promotion", desc: "Drive urgency" },
                            { type: "New Product Launch", desc: "Generate buzz" },
                            { type: "Win-Back", desc: "Re-engage dormant customers" },
                            { type: "Educational", desc: "Provide value" }
                          ].map((item, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                            >
                              <span className="font-medium text-sm">{item.type}</span>
                              <span className="text-xs text-muted-foreground">{item.desc}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold mb-4">Psychological Triggers</h4>
                        <div className="space-y-3">
                          <div className="p-4 bg-gradient-to-r from-pink-500/10 to-pink-500/5 rounded-lg border border-pink-500/20">
                            <Badge variant="outline" className="mb-2 text-xs">Urgency</Badge>
                            <p className="text-sm font-medium">"Clock's ticking: 25% off ends in 48 hours"</p>
                          </div>
                          <div className="p-4 bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-lg border border-purple-500/20">
                            <Badge variant="outline" className="mb-2 text-xs">Curiosity</Badge>
                            <p className="text-sm font-medium">"A gift for you inside..."</p>
                          </div>
                          <div className="p-4 bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-lg border border-blue-500/20">
                            <Badge variant="outline" className="mb-2 text-xs">Direct Benefit</Badge>
                            <p className="text-sm font-medium">"Don't pay full price (25% off inside)"</p>
                          </div>
                          <div className="p-4 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-lg border border-green-500/20">
                            <Badge variant="outline" className="mb-2 text-xs">Social Proof</Badge>
                            <p className="text-sm font-medium">"10,000+ travelers trust this bag"</p>
                          </div>
                          <div className="p-4 bg-gradient-to-r from-orange-500/10 to-orange-500/5 rounded-lg border border-orange-500/20">
                            <Badge variant="outline" className="mb-2 text-xs">FOMO</Badge>
                            <p className="text-sm font-medium">"Only 15 left in stock!"</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-6 rounded-xl border border-pink-500/20">
                      <div className="flex items-start gap-4">
                        <Mail className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold mb-2">Get Multiple Options for A/B Testing</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive multiple subject line variations for each email type, complete with our best suggestion and industry best practices to maximize your open rates.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center p-8 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl border-2 border-primary/20"
        >
          <h3 className="text-2xl font-bold mb-3">Ready to Transform Your Copy?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            All five tools works seamlessly. Input your product once, and generate headlines, descriptions, bullets, ads, and email subject lines instantly.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Single product input
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Batch CSV processing
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Multiple variations
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Expert recommendations
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};