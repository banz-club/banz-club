'use client';

import { motion } from 'motion/react';
import { Link } from 'next-view-transitions';

import SvgLogo from '@/components/core/reusable/svg-logo';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Separator } from '@/components/ui/separator';
import { githubRepoUrl } from '@/lib/metadata';

export function HomeHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className='sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm'
    >
      <div className='flex h-14 w-full items-center gap-4 px-4 md:px-6'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href='/'
            className='flex items-center gap-1 text-lg font-semibold transition-all hover:opacity-80 md:gap-2'
          >
            <SvgLogo />
            <span className='text-base md:text-lg'>banz.club</span>
          </Link>
        </motion.div>

        <Separator orientation='vertical' className='h-6' />

        <motion.div
          className='ml-auto flex items-center gap-4'
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link href={githubRepoUrl} target='_blank' rel='noopener noreferrer'>
            <Button variant='linkHover2' size='icon'>
              Github
            </Button>
          </Link>
          <ModeToggle />
        </motion.div>
      </div>
    </motion.header>
  );
}
