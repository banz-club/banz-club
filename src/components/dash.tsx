"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState, useCallback } from "react";
import { BanStats, BanStatsSchema } from "@/interfaces/bans";
import { useStats } from "@/store/use-stats";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert } from "@/components/ui/alert";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  TooltipProps,
} from "recharts";
import { Shield, Bot } from "lucide-react";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

const POLL_INTERVAL = 60000; // 1 minute in ms

const chartConfig = {
  watchdog_bans: {
    label: "Watchdog Bans",
    color: "hsl(var(--primary))",
    icon: Bot,
  },
  staff_bans: {
    label: "Staff Bans",
    color: "hsl(var(--destructive))",
    icon: Shield,
  },
} satisfies ChartConfig;

async function fetchBanStats(): Promise<BanStats> {
  const res = await fetch("https://api.plancke.io/hypixel/v1/punishmentStats");
  const data = await res.json();
  return BanStatsSchema.parse(data);
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-lg border border-border bg-background p-3 shadow-xl">
      <p className="mb-2 text-xs text-muted-foreground">
        {new Date(label).toLocaleTimeString()}
      </p>
      <div className="grid gap-2">
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            {entry.name === "watchdog_bans" ? (
              <Bot className="h-4 w-4 text-primary" />
            ) : (
              <Shield className="h-4 w-4 text-destructive" />
            )}
            <span className="text-sm">
              {entry.name === "watchdog_bans" ? "Watchdog" : "Staff"} banned{" "}
              <span
                className={`font-medium ${
                  entry.name === "watchdog_bans"
                    ? "text-primary"
                    : "text-destructive"
                }`}
              >
                {entry.value?.toLocaleString()}
              </span>{" "}
              players
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export function Dashboard() {
  const isFirstFetch = useRef(true);
  const [timeLeft, setTimeLeft] = useState<number>(POLL_INTERVAL);
  const {
    currentStats,
    history,
    nextFetch,
    setCurrentStats,
    addHistoryEntry,
    setFetchTimes,
    clearData,
  } = useStats();

  const { data, error, isFetching } = useQuery({
    queryKey: ["banStats"],
    queryFn: fetchBanStats,
    refetchInterval: POLL_INTERVAL,
    staleTime: POLL_INTERVAL,
  });

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (nextFetch) {
        const left = Math.max(0, nextFetch - Date.now());
        setTimeLeft(left);

        if (left === 0) {
          setTimeLeft(POLL_INTERVAL);
        }
      }
    }, 100);

    return () => clearInterval(timer);
  }, [nextFetch]);

  // Memoize the data update handler
  const handleDataUpdate = useCallback(() => {
    if (!data) return;

    const prevStats = currentStats;
    setCurrentStats(data);
    setFetchTimes(Date.now(), Date.now() + POLL_INTERVAL);

    if (!isFirstFetch.current && prevStats) {
      const watchdogBans =
        data.record.watchdog_total - prevStats.record.watchdog_total;
      const staffBans = data.record.staff_total - prevStats.record.staff_total;

      if (watchdogBans > 0 || staffBans > 0) {
        addHistoryEntry({
          timestamp: Date.now(),
          watchdog_lastMinute: data.record.watchdog_lastMinute,
          staff_rollingDaily: data.record.staff_rollingDaily,
          watchdog_rollingDaily: data.record.watchdog_rollingDaily,
          watchdog_bans: watchdogBans,
          staff_bans: staffBans,
        });
      }
    } else {
      isFirstFetch.current = false;
    }
  }, [data, currentStats, setCurrentStats, addHistoryEntry, setFetchTimes]);

  // Use the memoized handler
  useEffect(() => {
    handleDataUpdate();
  }, [handleDataUpdate]);

  if (error) {
    return <Alert variant="destructive">Failed to load ban statistics</Alert>;
  }

  return (
    <div className="flex flex-col gap-4 flex-1 max-h-full">
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold">Hypixel Ban Statistics</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={clearData}
            className="text-xs px-2 py-1 rounded bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Clear Data
          </button>
          <div className="text-sm text-muted-foreground">
            Next update in: {(timeLeft / 1000).toFixed(1)}s
            {isFetching && " (Updating...)"}
          </div>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-5 shrink-0">
        <StatsCard
          title="Watchdog Last Minute"
          value={currentStats?.record.watchdog_lastMinute ?? 0}
          loading={isFetching}
        />
        <StatsCard
          title="Staff Rolling Daily"
          value={currentStats?.record.staff_rollingDaily ?? 0}
          loading={isFetching}
        />
        <StatsCard
          title="Watchdog Rolling Daily"
          value={currentStats?.record.watchdog_rollingDaily ?? 0}
          loading={isFetching}
        />
        <StatsCard
          title="Watchdog Total"
          value={currentStats?.record.watchdog_total ?? 0}
          loading={isFetching}
        />
        <StatsCard
          title="Staff Total"
          value={currentStats?.record.staff_total ?? 0}
          loading={isFetching}
        />
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-4 min-h-0 flex-1">
        <Card className="flex flex-col overflow-hidden">
          <div className="p-4 pb-0 shrink-0">
            <h2 className="text-lg font-semibold">Ban Activity</h2>
          </div>
          <div className="flex-1 p-4 min-h-0">
            {history.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                Waiting for activity data...
              </div>
            ) : (
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={history}>
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

        <Card className="flex flex-col overflow-hidden">
          <div className="p-4 pb-0 shrink-0">
            <h2 className="text-lg font-semibold">Activity Log</h2>
          </div>
          <ScrollArea className="flex-1 px-4">
            {history.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-8">
                Waiting for activity data...
              </div>
            ) : (
              history.map((entry) =>
                entry.watchdog_bans > 0 || entry.staff_bans > 0 ? (
                  <div key={entry.timestamp} className="mb-2 text-sm">
                    <div className="grid gap-2">
                      {entry.watchdog_bans > 0 && (
                        <div className="flex items-center gap-2 p-2 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors">
                          <Bot className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-xs text-muted-foreground">
                            {new Date(entry.timestamp).toLocaleTimeString()}
                          </span>
                          <span className="grow">
                            Watchdog banned{" "}
                            <span className="font-medium text-primary">
                              {entry.watchdog_bans.toLocaleString()}
                            </span>{" "}
                            players
                          </span>
                        </div>
                      )}
                      {entry.staff_bans > 0 && (
                        <div className="flex items-center gap-2 p-2 rounded-md bg-destructive/10 hover:bg-destructive/20 transition-colors">
                          <Shield className="h-4 w-4 text-destructive shrink-0" />
                          <span className="text-xs text-muted-foreground">
                            {new Date(entry.timestamp).toLocaleTimeString()}
                          </span>
                          <span className="grow">
                            Staff banned{" "}
                            <span className="font-medium text-destructive">
                              {entry.staff_bans.toLocaleString()}
                            </span>{" "}
                            players
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : null
              )
            )}
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}

function StatsCard({
  title,
  value,
  loading,
}: {
  title: string;
  value: number;
  loading?: boolean;
}) {
  return (
    <Card className="p-3 relative overflow-hidden">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="mt-1 text-xl font-bold">{value.toLocaleString()}</div>
      {loading && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] flex items-center justify-center">
          <div className="animate-pulse">Updating...</div>
        </div>
      )}
    </Card>
  );
}
