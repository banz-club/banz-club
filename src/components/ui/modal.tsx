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
          className='fixed inset-0 z-50'
          onClick={onClick}
        >
          <div className='fixed inset-0 bg-background/80 backdrop-blur-sm' />

          <div className='fixed inset-0 flex items-center justify-center'>
            <motion.div
              ref={wrapper}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className='relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-lg border bg-background p-6 shadow-lg'
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className='absolute right-4 top-4 flex items-center gap-2'>
                <button
                  onClick={handleFullView}
                  className='inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground'
                >
                  <span>Open full view</span>
                  <ArrowUpRight className='h-3 w-3' />
                </button>
                {showCloseButton && (
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={onDismiss}
                    className='h-8 w-8'
                  >
                    <X className='h-4 w-4' />
                  </Button>
                )}
              </div>
              <div className='mt-8'>{children}</div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
