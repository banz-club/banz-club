import { useQuery } from "@tanstack/react-query";
import { useCallback,useEffect, useRef, useState } from "react";

import { fetchBanStats } from "@/data-access/bans";
import { env } from "@/env";
import { useStats } from "@/store/use-stats";

const POLL_INTERVAL = env.NEXT_PUBLIC_POLL_INTERVAL;

export function useBanStats() {
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

  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ["banStats"],
    queryFn: fetchBanStats,
    refetchInterval: POLL_INTERVAL,
    staleTime: POLL_INTERVAL,
  });

  const updateStats = useCallback(() => {
    if (!data) return;

    const now = Date.now();
    const prevStats = currentStats;
    setCurrentStats(data);
    setFetchTimes(now, now + POLL_INTERVAL);

    if (!isFirstFetch.current && prevStats) {
      const watchdogDiff =
        data.record.watchdog_total - prevStats.record.watchdog_total;
      const staffDiff = data.record.staff_total - prevStats.record.staff_total;

      if (watchdogDiff > 0 || staffDiff > 0) {
        addHistoryEntry({
          timestamp: now,
          watchdog_lastMinute: data.record.watchdog_lastMinute,
          staff_rollingDaily: data.record.staff_rollingDaily,
          watchdog_rollingDaily: data.record.watchdog_rollingDaily,
          watchdog_bans: watchdogDiff,
          staff_bans: staffDiff,
        });
      }
    } else {
      isFirstFetch.current = false;
    }
  }, [data, currentStats, setCurrentStats, setFetchTimes, addHistoryEntry]);

  useEffect(() => {
    if (data) {
      updateStats();
    }
  }, [data, updateStats]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (nextFetch) {
        const remaining = Math.max(0, nextFetch - Date.now());
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextFetch]);

  return {
    timeLeft,
    isFetching,
    currentStats,
    history,
    clearData,
    error,
    refetch,
  };
}
