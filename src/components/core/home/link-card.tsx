'use client';

import { type LucideIcon } from 'lucide-react';
import { Link } from 'next-view-transitions';

import { BorderTrail } from '@/components/motion/border-trail';

type LinkCardProps = {
  href: string;
  title: string;
  description: string;
  icon?: LucideIcon;
};

export function LinkCard({
  href,
  title,
  description,
  icon: Icon
}: LinkCardProps) {
  return (
    <Link
      href={href}
      className='group relative overflow-hidden rounded-lg border bg-background/50 p-4 backdrop-blur-sm transition-colors hover:border-foreground/50 sm:p-6 lg:p-8'
    >
      <BorderTrail
        className='bg-gradient-to-r from-primary to-primary/50'
        size={100}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          boxShadow:
            '0px 0px 60px 30px rgb(var(--primary) / 0.15), 0 0 100px 60px rgb(var(--primary) / 0.1)'
        }}
      />
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2 sm:gap-3'>
          {Icon && (
            <Icon className='h-5 w-5 shrink-0 text-muted-foreground sm:h-6 sm:w-6' />
          )}
          <h2 className='text-xl font-semibold sm:text-2xl'>{title}</h2>
        </div>
        <p className='text-sm text-muted-foreground sm:text-base'>
          {description}
        </p>
      </div>
    </Link>
  );
}
