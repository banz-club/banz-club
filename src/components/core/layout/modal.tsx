'use client';

import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

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
      <DialogContent className='absolute left-[50%] top-[50%] flex h-[85vh] w-[90vw] max-w-4xl translate-x-[-50%] translate-y-[-50%] flex-col overflow-hidden rounded-lg border bg-background/95 p-0 shadow-lg backdrop-blur dark:bg-zinc-900/90'>
        <DialogTitle className='sr-only'>Modal Content</DialogTitle>
        <div className='flex h-14 items-center justify-between border-b px-4'>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onClick={handleFullView}
                className='group inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
                tabIndex={-1}
              >
                <span>Full view</span>
                <ArrowUpRight className='h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
              </motion.button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Redirects to full page view (will refetch data)</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className='flex flex-1 flex-col overflow-y-auto'
        >
          <div className='flex min-h-full flex-col p-4'>{children}</div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
