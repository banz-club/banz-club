"use client";

import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/components/error-boundary";

const Dashboard = dynamic(
  () => import("@/components/dashboard").then((mod) => mod.Dashboard),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse">
        <div className="h-8 w-48 bg-muted rounded mb-8" />
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
          <div className="h-[400px] bg-muted rounded" />
          <div className="h-[400px] bg-muted rounded" />
        </div>
      </div>
    ),
  }
);

export function DashboardWrapper() {
  return (
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  );
}
