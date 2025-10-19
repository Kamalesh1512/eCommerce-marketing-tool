'use client'
import { useInView , motion} from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useRef } from "react";

export const SolutionPoint: React.FC<{ text: string; index: number }> = ({ text, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex items-start gap-3"
    >
      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
      <p className="text-sm leading-relaxed">{text}</p>
    </motion.div>
  );
};