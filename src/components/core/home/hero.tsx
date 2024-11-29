"use client";

import { motion } from "motion/react";

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12">
      <motion.div
        initial={{ filter: "blur(8px)" }}
        animate={{ filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-primary to-primary/50 text-transparent bg-clip-text"
          initial={{
            opacity: 0,
            y: 100,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 1.2,
            type: "spring",
            bounce: 0.4,
            stiffness: 80,
          }}
        >
          Hypixel Ban Statistics
        </motion.h1>
      </motion.div>

      <motion.p
        className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl"
        initial={{
          opacity: 0,
          y: 40,
          filter: "blur(4px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 1,
          delay: 0.4,
          type: "spring",
          stiffness: 70,
        }}
      >
        Track Hypixel&apos;s ban activity with real-time updates, detailed
        metrics, and interactive visualizations.
      </motion.p>
    </div>
  );
}
