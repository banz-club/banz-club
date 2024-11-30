'use client';

import { motion } from 'motion/react';

import { InfoHeader } from '@/components/core/info/header';

import { InfoContentServer } from './content-server';

export function InfoContent() {
  return (
    <div className='flex flex-1 flex-col'>
      <InfoHeader />
      <main className='flex flex-1 items-center justify-center p-4'>
        <motion.div
          className='w-full max-w-3xl'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <InfoContentServer />
        </motion.div>
      </main>
    </div>
  );
}
