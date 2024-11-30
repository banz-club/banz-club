'use client';

import { useCallback } from 'react';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useStats } from '@/store/use-stats';

const intervals = [
  { value: '5000', label: '5 seconds' },
  { value: '10000', label: '10 seconds' },
  { value: '15000', label: '15 seconds' },
  { value: '30000', label: '30 seconds' },
  { value: '60000', label: '1 minute' }
];

export function PollIntervalSelect() {
  const { setPollInterval, pollInterval } = useStats();

  const handleValueChange = useCallback(
    (value: string) => {
      setPollInterval(parseInt(value));
    },
    [setPollInterval]
  );

  return (
    <div className='flex w-full flex-col sm:w-auto'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Label
              htmlFor='poll-interval'
              className='mb-1 cursor-help text-xs text-muted-foreground'
            >
              Refresh Interval
            </Label>
          </TooltipTrigger>
          <TooltipContent side='bottom'>
            How often to fetch new data
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Select value={pollInterval.toString()} onValueChange={handleValueChange}>
        <SelectTrigger id='poll-interval' className='h-8'>
          <SelectValue placeholder='Select interval' />
        </SelectTrigger>
        <SelectContent>
          {intervals.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
