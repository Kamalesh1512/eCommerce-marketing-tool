'use client'
import { useInView, motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { PainPoint } from "../animation/pain-point";


// Problem Section Component
export const ProblemSection: React.FC = () => {
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
            The Problem
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Copy Is Killing Your Sales
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Most Shopify stores fail before the customer even reads the second sentence. Here's why:
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            "Boring, descriptive headlines that make you a commodity competing on price alone",
            "Feature-heavy descriptions that read like user manuals and create zero emotion",
            "Facebook ads that get scrolled past instantly, burning your ad budget with nothing to show",
            "Email subject lines with 10% open rates—every unopened email is a lost sale",
            "Product features listed without benefits—customers don't buy specs, they buy outcomes"
          ].map((pain, i) => (
            <PainPoint key={i} text={pain} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
