'use client'
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Badge } from '../ui/badge';
import { ArrowRight, Clock, DollarSign, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { AnimatedCounter } from '../animation/animated-counter';
import { WaitlistForm } from './waitlist-form';


/// current landing page with waitlist
export const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.section 
      ref={ref}
      style={{ opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32 px-4"
    >
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div 
        style={{ y }}
        className="relative z-10 max-w-5xl mx-auto text-center space-y-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
            <Sparkles className="w-3 h-3 mr-2" />
            Launching Soon • Join Existing Store Owners
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          Your Products Are Great, But
          <br />
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Your Copy Is Killing Sales.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        >
          AI-powered copywriting tools that turn browsers into buyers. Create headlines, descriptions, and ads that actually convert—in seconds, not hours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-xl mx-auto"
        >
          <WaitlistForm />
          <p className="text-sm text-muted-foreground mt-3">
            🎁 Early access + lifetime 30% discount for first 100 signups
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary flex items-center justify-center gap-1">
              <TrendingUp className="w-6 h-6" />
              <AnimatedCounter end={3} suffix="x" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">Higher Conversion</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary flex items-center justify-center gap-1">
              <Clock className="w-6 h-6" />
              <AnimatedCounter end={90} suffix="%" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">Time Saved</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary flex items-center justify-center gap-1">
              <DollarSign className="w-6 h-6" />
              <AnimatedCounter end={5} suffix="k+" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">Revenue Boost</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};


// Hero Section Component
// export const HeroSection: React.FC = () => {
//   const ref = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"]
//   });

//   const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
//   const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

//   return (
//     <motion.section 
//       ref={ref}
//       style={{ opacity }}
//       className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32 px-4"
//     >
//       {/* Background Gradient Orbs */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           animate={{
//             scale: [1, 1.2, 1],
//             rotate: [0, 90, 0],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//           className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{
//             scale: [1.2, 1, 1.2],
//             rotate: [90, 0, 90],
//           }}
//           transition={{
//             duration: 25,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//           className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
//         />
//       </div>

//       <motion.div 
//         style={{ y }}
//         className="relative z-10 max-w-5xl mx-auto text-center space-y-8"
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
//             <Sparkles className="w-3 h-3 mr-2" />
//             AI-Powered Copy Generation
//           </Badge>
//         </motion.div>

//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//           className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
//         >
//           Stop Losing Sales to
//           <br />
//           <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
//             Bad Copy
//           </span>
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
//         >
//           Transform your eCommerce store with headlines, product descriptions, and ad copy that actually converts. Built for entrepreneurs who want results, not guesswork.
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="flex flex-col sm:flex-row gap-4 justify-center items-center"
//         >
//           <Button size="lg" className="text-lg px-8 py-6 group">
//             Start Creating for Free
//             <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
//           </Button>
//           <Button size="lg" variant="outline" className="text-lg px-8 py-6">
//             See It In Action
//           </Button>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8, delay: 0.5 }}
//           className="flex flex-wrap justify-center gap-8 pt-8"
//         >
//           <div className="text-center">
//             <div className="text-3xl font-bold text-primary">
//               <AnimatedCounter end={10} suffix="x" />
//             </div>
//             <p className="text-sm text-muted-foreground">Better CTR</p>
//           </div>
//           <Separator orientation="vertical" className="h-12 hidden sm:block" />
//           <div className="text-center">
//             <div className="text-3xl font-bold text-primary">
//               <AnimatedCounter end={5} suffix="+" />
//             </div>
//             <p className="text-sm text-muted-foreground">AI Tools</p>
//           </div>
//           <Separator orientation="vertical" className="h-12 hidden sm:block" />
//           <div className="text-center">
//             <div className="text-3xl font-bold text-primary">
//               <AnimatedCounter end={30} suffix="s" />
//             </div>
//             <p className="text-sm text-muted-foreground">To Great Copy</p>
//           </div>
//         </motion.div>
//       </motion.div>
//     </motion.section>
//   );
// };

