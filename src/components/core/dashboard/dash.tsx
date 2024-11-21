"use client";

import { ActivityChart } from "./activity-chart/chart";
import { ActivityLog } from "./activity-log/log";
import { StatsOverview } from "./stats/overview";
import { DashboardHeader } from "./header";
import { useBanStats } from "@/hooks/use-ban-stats";

export function Dashboard() {
  const { timeLeft, isFetching, currentStats, history, clearData } =
    useBanStats();

  return (
    <div className="flex flex-col">
      <DashboardHeader
        timeLeft={timeLeft}
        isUpdating={isFetching}
        onClear={clearData}
      />

      <main className="container space-y-4 p-4 md:space-y-6 md:p-6">
        <StatsOverview stats={currentStats} loading={isFetching} />

        <div className="grid gap-4 md:grid-cols-[1fr,300px] lg:grid-cols-[1fr,400px]">
          <ActivityChart data={history} />
          <ActivityLog data={history} />
        </div>
      </main>
    </div>
  );
}
