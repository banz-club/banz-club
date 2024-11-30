'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
  defaultOpen?: boolean;
  showCloseButton?: boolean;
  currentPath?: string;
}

export function Modal({
  children,
  onClose,
  defaultOpen = true,
  showCloseButton = true,
  currentPath
}: ModalProps) {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
    onClose?.();
  }, [router, onClose]);

  const handleFullView = useCallback(() => {
    if (currentPath) {
      window.location.href = currentPath;
    }
  }, [currentPath]);

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        onDismiss();
      }
    },
    [onDismiss]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <AnimatePresence mode='wait'>
      {defaultOpen && (
        <motion.div
          ref={overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='fixed inset-0 z-50'
          onClick={onClick}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 bg-background/80 backdrop-blur-md'
          />

          <div className='fixed inset-0 flex items-center justify-center p-4'>
            <motion.div
              ref={wrapper}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1] // custom ease curve
              }}
              className='relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-xl border bg-background/95 p-6 shadow-2xl ring-1 ring-zinc-950/10 backdrop-blur dark:bg-zinc-900/90 dark:ring-white/10'
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className='absolute right-4 top-4 flex items-center gap-4'>
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={handleFullView}
                  className='group inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
                >
                  <span>Full view</span>
                  <ArrowUpRight className='h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
                </motion.button>
                {showCloseButton && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={onDismiss}
                      className='h-8 w-8 rounded-full transition-transform hover:scale-105'
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </motion.div>
                )}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className='mt-8'
              >
                {children}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
