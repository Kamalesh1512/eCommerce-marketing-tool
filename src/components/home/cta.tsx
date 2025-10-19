'use client'
import { ArrowRight, CheckCircle2, Rocket, Shield } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// CTA Section
export const CTASection: React.FC = () => {
  return (
    <section className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="relative overflow-hidden border-2 border-primary/20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10" />
          <CardContent className="relative p-12 text-center space-y-6">
            <Rocket className="w-16 h-16 text-primary mx-auto" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Stop Losing Sales?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join hundreds of Shopify owners who've transformed their stores with copy that converts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="text-lg px-8 py-6">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Schedule Demo
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                5-minute setup
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};
