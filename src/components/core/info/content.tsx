'use client';

import { motion } from 'motion/react';

import { InfoHeader } from '@/components/core/info/header';

import { InfoContentServer } from './content-server';

interface InfoContentProps {
  isModal?: boolean;
}

export function InfoContent({ isModal = false }: InfoContentProps) {
  return (
    <div className={isModal ? '' : 'flex flex-1 flex-col'}>
      {!isModal && <InfoHeader />}
      <main className={isModal ? '' : 'container mx-auto flex-1'}>
        <motion.div
          className='space-y-4 px-4 md:space-y-6 md:p-6'
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
