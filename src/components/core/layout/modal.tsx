'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

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
  currentPath
}: ModalProps) {
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

  return (
    <Dialog
      defaultOpen={defaultOpen}
      open={defaultOpen}
      onOpenChange={onDismiss}
    >
      <DialogContent className='max-h-[90vh] max-w-4xl bg-background/95 p-6 backdrop-blur dark:bg-zinc-900/90'>
        <DialogTitle className='sr-only'>Modal Content</DialogTitle>
        <div className='absolute left-4 top-4'>
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
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='mt-8'
        >
          {children}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
