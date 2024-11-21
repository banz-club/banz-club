"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState, useCallback } from "react";
import { Alert } from "@/components/ui/alert";
import { useStats } from "@/store/use-stats";
import { BanStats, BanStatsSchema } from "@/interfaces/bans";
import { Header } from "@/components/dashboard/header";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { ActivityChart } from "@/components/dashboard/activity-chart/chart";
import { ActivityLog } from "@/components/dashboard/activity-log";
import { CONFIG } from "@/lib/config";

async function fetchBanStats(): Promise<BanStats> {
  const res = await fetch("/api/stats");
  if (!res.ok) throw new Error("Failed to fetch stats");
  const data = await res.json();
  return BanStatsSchema.parse(data);
}

export function Dashboard() {
  const isFirstFetch = useRef(true);
  const [timeLeft, setTimeLeft] = useState<number>(CONFIG.POLL_INTERVAL);
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
    refetchInterval: CONFIG.POLL_INTERVAL,
    staleTime: CONFIG.POLL_INTERVAL,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (nextFetch) {
        const left = Math.max(0, nextFetch - Date.now());
        setTimeLeft(left);

        if (left === 0) {
          setTimeLeft(CONFIG.POLL_INTERVAL);
        }
      }
    }, 1000); // Reduced from 100ms to 1000ms to lower CPU usage

    return () => clearInterval(timer);
  }, [nextFetch]);

  // Handle data updates
  const handleDataUpdate = useCallback(() => {
    if (!data) return;

    const prevStats = currentStats;
    setCurrentStats(data);
    setFetchTimes(Date.now(), Date.now() + CONFIG.POLL_INTERVAL);

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

  useEffect(() => {
    handleDataUpdate();
  }, [handleDataUpdate]);

  if (error) {
    return <Alert variant="destructive">Failed to load ban statistics</Alert>;
  }

  return (
    <div className="flex flex-col gap-4 flex-1 max-h-full">
      <Header timeLeft={timeLeft} isUpdating={isFetching} onClear={clearData} />
      <StatsOverview stats={currentStats} loading={isFetching} />
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 min-h-0 flex-1">
        <ActivityChart data={history} />
        <ActivityLog data={history} />
      </div>
    </div>
  );
}
