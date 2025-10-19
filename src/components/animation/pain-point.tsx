'use client'
import { useInView, motion } from "framer-motion";
import { useRef } from "react";

// Pain Point Component
export const PainPoint: React.FC<{ text: string; index: number }> = ({ text, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex items-start gap-3 p-4 rounded-lg bg-destructive/5 border border-destructive/20"
    >
      <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
      <p className="text-sm leading-relaxed">{text}</p>
    </motion.div>
  );
};