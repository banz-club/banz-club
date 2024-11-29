'use client';

import { motion } from 'motion/react';

import { ClientSideInfo } from '@/components/core/info/client-side-info';
import { Features } from '@/components/core/info/features';
import { InfoHeader } from '@/components/core/info/header';
import { Card } from '@/components/ui/card';

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
          <Card className='space-y-4 p-6'>
            <h1 className='text-2xl font-bold'>How It Works</h1>
            <ClientSideInfo />
            <Features />
            <div className='border-t pt-4 text-sm text-muted-foreground'>
              Note: This is a demo application intended to showcase client-side
              state management and real-time updates using React and Zustand.
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
