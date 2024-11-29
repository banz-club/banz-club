"use client";

import { ActivityChart } from "@/components/core/dashboard/activity-chart/chart";
import { ActivityLog } from "@/components/core/dashboard/activity-log/log";
import { DashboardHeader } from "@/components/core/dashboard/header";
import { StatsOverview } from "@/components/core/dashboard/stats/overview";
import { DashboardToolbar } from "@/components/core/dashboard/toolbar";
import { useBanStats } from "@/hooks/use-ban-stats";

export function Dashboard() {
  const { timeLeft, isFetching, currentStats, history } = useBanStats();

  return (
    <div className="flex-1 flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto">
        <DashboardToolbar isUpdating={isFetching} timeLeft={timeLeft} />
        <div className="px-4 space-y-4 md:space-y-6 md:p-6">
          <StatsOverview stats={currentStats} loading={isFetching} />
          <div className="grid gap-4 md:grid-cols-[1fr,300px] lg:grid-cols-[1fr,400px]">
            <ActivityChart data={history} />
            <ActivityLog data={history} />
          </div>
        </div>
      </main>
    </div>
  );
}
