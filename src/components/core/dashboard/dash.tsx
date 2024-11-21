"use client";

import { Alert } from "@/components/ui/alert";
import { DashboardHeader } from "@/components/core/dashboard/header";
import { StatsOverview } from "@/components/core/dashboard/stats/overview";
import { ActivityChart } from "@/components/core/dashboard/activity-chart/chart";
import { ActivityLog } from "@/components/core/dashboard/activity-log/log";
import { useBanStats } from "@/hooks/use-ban-stats";

export function Dashboard() {
  const { timeLeft, isFetching, currentStats, history, clearData, error } =
    useBanStats();

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
