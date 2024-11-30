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
      <main
        className={isModal ? '' : 'flex flex-1 items-center justify-center p-4'}
      >
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
