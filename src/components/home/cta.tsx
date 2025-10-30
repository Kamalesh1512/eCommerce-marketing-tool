"use client";
import { ArrowRight, CheckCircle2, Clock, Rocket, Shield } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { WaitlistForm } from "./waitlist-form";
import { useState } from "react";
import { WaitlistStats } from "./waitlist-stats";

// CTA Section
export const CTASection: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  return (
    // <section className="py-24 px-4">
    //   <motion.div
    //     initial={{ opacity: 0, scale: 0.95 }}
    //     whileInView={{ opacity: 1, scale: 1 }}
    //     viewport={{ once: true }}
    //     transition={{ duration: 0.6 }}
    //     className="max-w-4xl mx-auto"
    //   >
    //     <Card className="relative overflow-hidden border-2 border-primary/20">
    //       <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10" />
    //       <CardContent className="relative p-12 text-center space-y-6">
    //         <Rocket className="w-16 h-16 text-primary mx-auto" />
    //         <h2 className="text-4xl md:text-5xl font-bold">
    //           Ready to Stop Losing Sales?
    //         </h2>
    //         <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
    //           Join hundreds of Shopify owners who've transformed their stores with copy that converts.
    //         </p>
    //         <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
    //           <Button size="lg" className="text-lg px-8 py-6">
    //             Get Started Free
    //             <ArrowRight className="w-5 h-5 ml-2" />
    //           </Button>
    //           <Button size="lg" variant="outline" className="text-lg px-8 py-6">
    //             Schedule Demo
    //           </Button>
    //         </div>
    //         <div className="flex items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
    //           <div className="flex items-center gap-2">
    //             <Shield className="w-4 h-4" />
    //             No credit card required
    //           </div>
    //           <div className="flex items-center gap-2">
    //             <CheckCircle2 className="w-4 h-4" />
    //             5-minute setup
    //           </div>
    //         </div>
    //       </CardContent>
    //     </Card>
    //   </motion.div>
    // </section>

    <section className="py-24 px-4 bg-muted/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <Card className="relative overflow-hidden border-2 border-primary/20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10" />
          <CardContent className="relative p-12 text-center space-y-6">
            <Rocket className="w-16 h-16 text-primary mx-auto" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Stop Losing Sales to Bad Copy
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join the waitlist now and get lifetime 30% off when we launch.
              <br />
              <span className="font-semibold text-primary">
                Only 100 spots available at this price.
              </span>
            </p>

            <div className="max-w-md mx-auto pt-4">
              <WaitlistForm
                onSuccess={() => setRefreshKey((prev) => prev + 1)}
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Launching Soon!!!
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Cancel anytime
              </div>
            </div>

            <WaitlistStats key={refreshKey} />
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};
