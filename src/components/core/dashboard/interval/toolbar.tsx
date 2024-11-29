'use client';

import NumberFlow from '@number-flow/react';
import { Clock } from 'lucide-react';

import { PollIntervalSelect } from '@/components/core/dashboard/interval/poll-interval-select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useStats } from '@/store/use-stats';

interface ToolbarProps {
  timeLeft: number;
  isUpdating: boolean;
}

export function DashboardToolbar({ isUpdating, timeLeft }: ToolbarProps) {
  const { clearData } = useStats();
  const displayTime = timeLeft / 1000;

  return (
    <div className='flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex items-center gap-4'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='flex items-center gap-1.5 text-sm text-muted-foreground'>
                <Clock className='h-4 w-4' />
                <span>Update in:</span>
                <NumberFlow
                  value={displayTime}
                  className='font-mono font-medium'
                  format={{
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1
                  }}
                />
                s
                {isUpdating && (
                  <span className='ml-1 text-primary'>(Updating...)</span>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>Time until next data refresh</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Separator orientation='vertical' className='h-5' />
        <PollIntervalSelect />
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='destructive' size='sm' className='w-full sm:w-auto'>
            Clear Data
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all collected statistics data. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={clearData}>
              Clear Data
            </AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
