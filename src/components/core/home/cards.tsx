'use client';

import { InfoIcon, ListIcon } from 'lucide-react';
import { motion } from 'motion/react';

import { LinkCard } from './link-card';

export function Cards() {
  return (
    <motion.div
      className='grid w-full max-w-2xl grid-cols-1 gap-6 md:grid-cols-2'
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.95,
        filter: 'blur(4px)'
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)'
      }}
      transition={{
        duration: 0.8,
        delay: 0.6,
        type: 'spring',
        bounce: 0.4
      }}
    >
      <LinkCard
        href='/dash'
        title='Dashboard'
        description='View real-time ban statistics and analytics'
        icon={ListIcon}
      />
      <LinkCard
        href='/info'
        title='Information'
        description='Learn more about the project and its features'
        icon={InfoIcon}
      />
    </motion.div>
  );
}
