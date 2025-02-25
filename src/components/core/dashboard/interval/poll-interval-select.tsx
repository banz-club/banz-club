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
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useStats } from '@/store/use-stats';

const intervals = [
  { value: '30000', label: '30 seconds' },
  { value: '60000', label: '1 minute' },
  { value: '300000', label: '5 minutes' }
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
