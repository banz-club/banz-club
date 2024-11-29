'use client';

import { motion } from 'motion/react';

export function Hero() {
  return (
    <div className='flex flex-col items-center justify-center gap-8 py-12'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className='bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl lg:text-6xl'
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut'
          }}
        >
          Hypixel Ban Statistics
        </motion.h1>
      </motion.div>

      <motion.p
        className='max-w-2xl text-center text-lg text-muted-foreground md:text-xl'
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: 'easeOut'
        }}
      >
        Track Hypixel&apos;s ban activity with real-time updates, detailed
        metrics, and interactive visualizations.
      </motion.p>
    </div>
  );
}
