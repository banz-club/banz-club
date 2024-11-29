import { Bot, Shield } from 'lucide-react';
import type { TooltipProps } from 'recharts';

export function CustomTooltip({
  active,
  payload,
  label
}: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className='rounded-lg border border-border bg-background p-3 shadow-xl'>
      <p className='mb-2 text-xs text-muted-foreground'>
        {new Date(label).toLocaleTimeString()}
      </p>
      <div className='grid gap-2'>
        {payload.map(entry => (
          <div key={entry.name} className='flex items-center gap-2'>
            {entry.name === 'watchdog_bans' ? (
              <Bot className='h-4 w-4 text-primary' />
            ) : (
              <Shield className='h-4 w-4 text-destructive' />
            )}
            <span className='text-sm'>
              {entry.name === 'watchdog_bans' ? 'Watchdog' : 'Staff'} banned{' '}
              <span
                className={`font-medium ${
                  entry.name === 'watchdog_bans'
                    ? 'text-primary'
                    : 'text-destructive'
                }`}
              >
                {entry.value?.toLocaleString()}
              </span>{' '}
              players
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
