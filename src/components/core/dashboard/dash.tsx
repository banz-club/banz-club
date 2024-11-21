"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState, useCallback } from "react";
import { Alert } from "@/components/ui/alert";
import { useStats } from "@/store/use-stats";
import { DashboardHeader } from "@/components/core/dashboard/header";
import { StatsOverview } from "@/components/core/dashboard/stats/overview";
import { ActivityChart } from "@/components/core/dashboard/activity-chart/chart";
import { ActivityLog } from "@/components/core/dashboard/activity-log/log";
import { fetchBanStats } from "@/data-access/bans";

const POLL_INTERVAL = 60000; // 1 minute in ms

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

  // Handle data updates
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

  useEffect(() => {
    handleDataUpdate();
  }, [handleDataUpdate]);

  if (error) {
    return <Alert variant="destructive">Failed to load ban statistics</Alert>;
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <DashboardHeader
        timeLeft={timeLeft}
        isUpdating={isFetching}
        onClear={clearData}
      />
      <StatsOverview stats={currentStats} loading={isFetching} />
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 min-h-0 flex-1 overflow-hidden">
        <ActivityChart data={history} />
        <ActivityLog data={history} />
      </div>
    </div>
  );
}
