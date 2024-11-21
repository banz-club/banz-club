"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
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
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const POLL_INTERVAL = 60000; // 1 minute in ms

async function fetchBanStats(): Promise<BanStats> {
  const res = await fetch("https://api.plancke.io/hypixel/v1/punishmentStats");
  const data = await res.json();
  return BanStatsSchema.parse(data);
}

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

        // Force refresh when timer hits 0
        if (left === 0) {
          setTimeLeft(POLL_INTERVAL);
        }
      }
    }, 100); // Update every 100ms for smooth countdown

    return () => clearInterval(timer);
  }, [nextFetch]);

  // Handle data updates
  useEffect(() => {
    if (data) {
      setCurrentStats(data);
      setFetchTimes(Date.now(), Date.now() + POLL_INTERVAL);

      if (!isFirstFetch.current) {
        addHistoryEntry({
          timestamp: Date.now(),
          watchdog_lastMinute: data.record.watchdog_lastMinute,
          staff_rollingDaily: data.record.staff_rollingDaily,
        });
      } else {
        isFirstFetch.current = false;
      }
    }
  }, [data, setCurrentStats, addHistoryEntry, setFetchTimes]);

  if (error) {
    return <Alert variant="destructive">Failed to load ban statistics</Alert>;
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Activity Log</h2>
          <div className="text-sm text-muted-foreground">
            Next update in: {(timeLeft / 1000).toFixed(1)}s
            {isFetching && " (Updating...)"}
          </div>
        </div>
        <ScrollArea className="h-[200px]">
          {history.length === 0 ? (
            <div className="text-sm text-muted-foreground text-center py-8">
              Waiting for activity data...
            </div>
          ) : (
            history.map((entry) => (
              <div key={entry.timestamp} className="mb-2 text-sm">
                <time className="text-muted-foreground">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </time>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    Watchdog:{" "}
                    <span className="font-medium">
                      {entry.watchdog_lastMinute}
                    </span>{" "}
                    bans/min
                  </div>
                  <div>
                    Staff:{" "}
                    <span className="font-medium">
                      {entry.staff_rollingDaily}
                    </span>{" "}
                    daily bans
                  </div>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </Card>

      <Card className="p-4">
        <h2 className="mb-4 text-lg font-semibold">Ban Activity Chart</h2>
        <div className="h-[300px]">
          {history.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
              Collecting data for the chart...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}
                  minTickGap={50}
                />
                <YAxis width={50} />
                <Tooltip
                  labelFormatter={(ts) =>
                    new Date(Number(ts)).toLocaleTimeString()
                  }
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="watchdog_lastMinute"
                  stroke="hsl(var(--primary))"
                  name="Watchdog Bans/min"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="staff_rollingDaily"
                  stroke="hsl(var(--destructive))"
                  name="Staff Daily Bans"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>
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
    <Card className="p-4 relative overflow-hidden">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="mt-2 text-2xl font-bold">{value.toLocaleString()}</div>
      {loading && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] flex items-center justify-center">
          <div className="animate-pulse">Updating...</div>
        </div>
      )}
    </Card>
  );
}
