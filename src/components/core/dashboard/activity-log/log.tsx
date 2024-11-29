import { format } from 'date-fns';
import { Shield, User } from 'lucide-react';

import { InView } from '@/components/motion/in-view';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type HistoryEntry } from '@/interfaces/bans';

interface ActivityLogProps {
  data: HistoryEntry[];
}

export function ActivityLog({ data }: ActivityLogProps) {
  return (
    <Card className='h-[400px] overflow-hidden'>
      <div className='border-b p-4'>
        <h2 className='font-semibold'>Activity Log</h2>
      </div>

      <ScrollArea className='h-[344px]'>
        <div className='space-y-2 p-4'>
          {data.map(entry => (
            <InView
              key={entry.timestamp}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.4 }}
              viewOptions={{ /* once: true,  */ margin: '-50px' }}
            >
              <div className='space-y-1'>
                {entry.watchdog_bans > 0 && (
                  <div className='flex items-center gap-2 text-sm'>
                    <span className='font-medium text-muted-foreground'>
                      {format(entry.timestamp, 'HH:mm:ss')}
                    </span>
                    <Shield className='h-4 w-4 text-primary' />
                    <span className='text-primary'>
                      Watchdog banned {entry.watchdog_bans}
                    </span>
                  </div>
                )}
                {entry.staff_bans > 0 && (
                  <div className='flex items-center gap-2 text-sm'>
                    <span className='font-medium text-muted-foreground'>
                      {format(entry.timestamp, 'HH:mm:ss')}
                    </span>
                    <User className='h-4 w-4 text-destructive' />
                    <span className='text-destructive'>
                      Staff banned {entry.staff_bans}
                    </span>
                  </div>
                )}
              </div>
            </InView>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
