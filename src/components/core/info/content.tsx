'use client';

import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { Features } from '@/components/core/info/features';
import { InfoHeader } from '@/components/core/info/header';

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

            <section className='space-y-2'>
              <h2 className='text-lg font-semibold'>Client-Side Processing</h2>
              <p className='text-muted-foreground'>
                This application runs entirely on the client side, which means:
              </p>
              <ul className='ml-4 list-inside list-disc space-y-1 text-muted-foreground'>
                <li>All data is stored in your browser&apos;s memory</li>
                <li>Refreshing the page will reset all counters</li>
                <li>
                  The clear data button will reset everything to initial state
                </li>
                <li>Data only becomes visible after the first update</li>
              </ul>
            </section>

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
