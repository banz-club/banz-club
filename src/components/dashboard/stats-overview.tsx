import { StatsCard } from "@/components/dashboard/stats-card";
import type { BanStats } from "@/interfaces/bans";

interface StatsOverviewProps {
  stats: BanStats | null;
  loading: boolean;
}

export function StatsOverview({ stats, loading }: StatsOverviewProps) {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 shrink-0">
      <StatsCard
        title="Watchdog Last Minute"
        value={stats?.record.watchdog_lastMinute ?? 0}
        loading={loading}
      />
      <StatsCard
        title="Staff Rolling Daily"
        value={stats?.record.staff_rollingDaily ?? 0}
        loading={loading}
      />
      <StatsCard
        title="Watchdog Rolling Daily"
        value={stats?.record.watchdog_rollingDaily ?? 0}
        loading={loading}
      />
      <StatsCard
        title="Watchdog Total"
        value={stats?.record.watchdog_total ?? 0}
        loading={loading}
      />
      <StatsCard
        title="Staff Total"
        value={stats?.record.staff_total ?? 0}
        loading={loading}
      />
    </div>
  );
}
