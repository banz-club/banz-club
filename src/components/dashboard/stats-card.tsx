import { Card } from "@/components/ui/card";
import NumberFlow from "@number-flow/react";

interface StatsCardProps {
  title: string;
  value: number;
  loading?: boolean;
}

export function StatsCard({ title, value, loading }: StatsCardProps) {
  return (
    <Card className="p-3 relative overflow-hidden">
      <div className="text-sm font-medium text-muted-foreground">{title}</div>
      <div className="mt-1 text-xl font-bold">
        <NumberFlow value={value} />
      </div>
      {loading && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] flex items-center justify-center">
          <div className="animate-pulse">Updating...</div>
        </div>
      )}
    </Card>
  );
}
