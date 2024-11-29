import { format } from 'date-fns';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { type Props as LegendProps } from 'recharts/types/component/DefaultLegendContent';

import { CustomTooltip } from '@/components/core/dashboard/activity-chart/tooltip';
import { Card } from '@/components/ui/card';
import { type HistoryEntry } from '@/interfaces/bans';

interface ActivityChartProps {
  data: HistoryEntry[];
}

const renderLegend = (props: LegendProps) => {
  const { payload } = props;
  if (!payload) return null;

  return (
    <div className='flex justify-center gap-4 text-sm text-muted-foreground'>
      {payload.map((entry, index) => {
        if (!entry.dataKey) return null;
        const dataKey = String(entry.dataKey);
        return (
          <div key={index} className='flex items-center gap-2'>
            <div
              className='h-3 w-3 rounded-full'
              style={{ backgroundColor: entry.color }}
            />
            <span>{dataKey === 'watchdog_bans' ? 'Watchdog' : 'Staff'}</span>
          </div>
        );
      })}
    </div>
  );
};

export function ActivityChart({ data }: ActivityChartProps) {
  return (
    <Card className='h-[400px]'>
      <div className='border-b p-4'>
        <h2 className='font-semibold'>Ban Activity</h2>
      </div>

      <div className='h-[344px] p-4 font-sans'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={data}>
            <defs>
              <linearGradient id='watchdog' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='hsl(var(--primary))'
                  stopOpacity={0.2}
                />
                <stop
                  offset='95%'
                  stopColor='hsl(var(--primary))'
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id='staff' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='hsl(var(--destructive))'
                  stopOpacity={0.2}
                />
                <stop
                  offset='95%'
                  stopColor='hsl(var(--destructive))'
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray='3 3'
              horizontal={true}
              vertical={false}
              stroke='hsl(var(--border))'
            />
            <XAxis
              dataKey='timestamp'
              tickFormatter={value => format(value, 'HH:mm')}
              stroke='hsl(var(--muted-foreground))'
              tickLine={false}
              fontSize={12}
              dy={10}
            />
            <YAxis
              stroke='hsl(var(--muted-foreground))'
              tickLine={false}
              axisLine={false}
              fontSize={12}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} verticalAlign='top' height={36} />
            <Area
              type='monotone'
              dataKey='watchdog_bans'
              stroke='hsl(var(--primary))'
              fill='url(#watchdog)'
              strokeWidth={2}
            />
            <Area
              type='monotone'
              dataKey='staff_bans'
              stroke='hsl(var(--destructive))'
              fill='url(#staff)'
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
