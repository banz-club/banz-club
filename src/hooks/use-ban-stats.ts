import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { fetchBanStats } from '@/data-access/bans';
import { useStats } from '@/store/use-stats';

export function useBanStats() {
  const isFirstFetch = useRef(true);
  const intervalRef = useRef<NodeJS.Timeout>();
  const {
    pollInterval,
    currentStats,
    history,
    nextFetch,
    setCurrentStats,
    addHistoryEntry,
    setFetchTimes,
    clearData
  } = useStats();
  const [timeLeft, setTimeLeft] = useState<number>(pollInterval);

  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ['banStats'],
    queryFn: fetchBanStats,
    refetchInterval: pollInterval,
    staleTime: pollInterval,
    retry: 3
  });

  const updateTimer = useCallback(() => {
    if (!nextFetch) {
      setTimeLeft(pollInterval);
      return;
    }

    const remaining = Math.max(0, nextFetch - Date.now());
    setTimeLeft(remaining);

    if (remaining === 0) {
      refetch();
    }
  }, [nextFetch, pollInterval, refetch]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    updateTimer();

    intervalRef.current = setInterval(updateTimer, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [updateTimer]);

  const updateStats = useCallback(() => {
    if (!data) return;

    const now = Date.now();
    const prevStats = currentStats;
    setCurrentStats(data);
    setFetchTimes(now, now + pollInterval);

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
          staff_bans: staffDiff
        });

        const totalBans = watchdogDiff + staffDiff;
        toast.success(`${totalBans} new ${totalBans === 1 ? 'ban' : 'bans'}`, {
          description: new Date(now).toLocaleTimeString()
        });
      }
    } else {
      isFirstFetch.current = false;
      toast.success('Data refreshed', {
        description: new Date(now).toLocaleTimeString()
      });
    }
  }, [
    data,
    currentStats,
    pollInterval,
    setCurrentStats,
    setFetchTimes,
    addHistoryEntry
  ]);

  useEffect(() => {
    if (data) {
      updateStats();
    }
  }, [data, updateStats]);

  return {
    timeLeft,
    isFetching,
    currentStats,
    history,
    clearData,
    error,
    refetch
  };
}
