import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { CustomTooltip } from "@/components/core/dashboard/activity-chart/tooltip";
import { chartConfig } from "@/components/core/dashboard/activity-chart/config";
import type { HistoryEntry } from "@/interfaces/bans";

interface ActivityChartProps {
  data: HistoryEntry[];
}

export function ActivityChart({ data }: ActivityChartProps) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="p-4 pb-0 shrink-0">
        <h2 className="text-lg font-semibold">Ban Activity</h2>
        <Separator className="my-2" />
      </div>
      <div className="flex-1 p-4 min-h-0">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
            Waiting for activity data...
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="timestamp"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}
                  minTickGap={50}
                />
                <YAxis width={50} tickLine={false} axisLine={false} />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ stroke: "hsl(var(--muted))" }}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                  type="monotone"
                  dataKey="watchdog_bans"
                  name="watchdog_bans"
                  stroke={chartConfig.watchdog_bans.color}
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="staff_bans"
                  name="staff_bans"
                  stroke={chartConfig.staff_bans.color}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </div>
    </Card>
  );
}
