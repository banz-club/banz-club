import NumberFlow from "@number-flow/react";

import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: number;
  loading?: boolean;
}

export function StatsCard({ title, value, loading }: StatsCardProps) {
  return (
    <Card className="p-3 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-0.5">
      <div className="text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-primary">
        {title}
      </div>
      <div className="mt-1 text-xl font-bold relative">
        <div className={loading ? "opacity-30" : ""}>
          <NumberFlow value={value} />
        </div>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-start">
            <div className="text-primary animate-pulse text-base">
              Updating...
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
